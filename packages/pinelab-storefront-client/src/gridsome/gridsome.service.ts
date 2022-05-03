import {
  GET_AVAILABLE_COUNTRIES,
  GET_COLLECTIONS,
  GET_PRODUCTS,
} from './gridsome.queries';
import {
  CalculatedProduct,
  CollectionMap,
  deduplicate,
  setCalculatedFields,
} from '../';
import { BasicCollection, ShopData } from './types/shop-data';
import {
  Collection,
  CollectionList,
  Country,
  Product,
  ProductList,
  ProductVariant,
} from '../generated/graphql';

interface SortableCollection {
  name: string;
  id: string;
  parent: SortableCollection;
  children: SortableCollection[];
}

/**
 * Generates Gridsome pages based on given PageMap
 */
export class GridsomeService {
  constructor(private graphqlFn: Function) {}

  async getShopData(): Promise<ShopData> {
    let [collectionList, allProducts, availableCountries] = await Promise.all([
      this.getAllCollections(),
      this.getAllProducts(),
      this.getAvailableCountries(),
    ]);
    const products = allProducts.map((p: Product) => setCalculatedFields(p));
    products.map((p) => (p.soldOut = false));

    const productsPerCollection: CollectionMap[] = collectionList.items.map(
      (collection: Collection) => {
        const products = this.getProductsForCollection(collection, allProducts);
        return {
          collection: { ...collection, productVariants: undefined },
          products,
        };
      }
    );
    const collections: BasicCollection[] = collectionList.items.map(
      (c: Collection) => ({
        ...c,
        productVariants: undefined,
      })
    );
    return {
      products,
      productsPerCollection,
      collections,
      availableCountries,
    };
  }

  /**
   * Get products of collection based on `collection.variants`
   */
  getProductsForCollection(
    collection: Collection,
    allProducts: Product[]
  ): CalculatedProduct[] {
    let productsPerCollection: Product[] = collection.productVariants.items
      .map((variant: ProductVariant) =>
        allProducts.find((product) => product.id === variant.product.id)
      )
      .filter((product): product is Product => !!product);
    productsPerCollection = deduplicate(productsPerCollection);
    return productsPerCollection.map((p) => setCalculatedFields(p));
  }

  async getAllCollections(): Promise<CollectionList> {
    const {
      data: {
        Vendure: { collections },
      },
    } = await this.graphqlFn(GET_COLLECTIONS);
    return collections;
  }

  /**
   * Get products in batches of 100
   */
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    let hasMore = true;
    let page = 1;
    let skip = 0;
    const take = 500;
    while (hasMore) {
      const {
        data: {
          Vendure: { products: productList },
        },
      } = await this.graphqlFn(GET_PRODUCTS, { options: { skip, take } });
      products.push(...productList.items);
      skip = page * take;
      page++;
      hasMore = productList.totalItems > products.length;
    }
    return products;
  }

  async getAvailableCountries(): Promise<Country[]> {
    const {
      data: {
        Vendure: { availableCountries },
      },
    } = await this.graphqlFn(GET_AVAILABLE_COUNTRIES);
    return availableCountries;
  }

  /**
   * By default the collection graphql query returns all child and parent collections in one flat array.
   * This function sets the correct childCollections for each topLevel collection.
   * @param allCollections
   */
  unflatten<T extends SortableCollection>(allCollections: T[]): T[] {
    // Get toplevel collections
    let collections = allCollections.filter(
      (col) => col.parent?.name === '__root_collection__'
    );
    // Find and set child collections, because queried children only have id and name fields
    return collections.map((collection) =>
      this.getChildCollection(collection, allCollections)
    );
  }

  /**
   * Recursively gets childCollections for given collection
   */
  private getChildCollection<T extends SortableCollection>(
    collection: T,
    allCollections: T[]
  ): T {
    const fullChildren = collection.children?.map((originalChild) => {
      let fullChildCollection = allCollections.find(
        (c) => c.id === originalChild.id
      );
      if (!fullChildCollection) {
        throw Error(
          `Child collection ${originalChild.name} is not in allCollections list`
        );
      }
      if (fullChildCollection?.children?.length) {
        fullChildCollection = this.getChildCollection(
          fullChildCollection,
          allCollections
        );
      }
      return fullChildCollection;
    });
    return {
      ...collection,
      children: fullChildren,
    };
  }
}
