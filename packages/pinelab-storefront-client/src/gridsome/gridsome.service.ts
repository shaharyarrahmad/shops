import {
  Collection,
  CollectionList,
  Country,
  Product,
  ProductList,
  ProductVariant,
} from '../../../common';
import {
  GET_AVAILABLE_COUNTRIES,
  GET_COLLECTIONS,
  GET_PRODUCTS,
} from './gridsome.queries';
import { CollectionMap, deduplicate, setCalculatedFields } from '../';
import { CalculatedProduct } from '../vendure/calculated-product';
import { BasicCollection, ShopData } from './types/shop-data';

/**
 * Generates Gridsome pages based on given PageMap
 */
export class GridsomeService {
  constructor(private graphqlFn: Function) {}

  async getShopData(): Promise<ShopData> {
    const [collectionList, productList, availableCountries] = await Promise.all(
      [
        this.getAllCollections(),
        this.getAllProducts(),
        this.getAvailableCountries(),
      ]
    );
    const products = productList.items.map((p: Product) =>
      setCalculatedFields(p)
    );
    products.map((p) => (p.soldOut = false));

    const productsPerCollection: CollectionMap[] = collectionList.items.map(
      (collection: Collection) => {
        const products = this.getProductsForCollection(collection);
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
  getProductsForCollection(collection: Collection): CalculatedProduct[] {
    let productsPerCollection: Product[] = collection.productVariants.items.map(
      (variant: ProductVariant) => variant.product
    );
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

  async getAllProducts(): Promise<ProductList> {
    const {
      data: {
        Vendure: { products },
      },
    } = await this.graphqlFn(GET_PRODUCTS);
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
  unflatten(allCollections: Collection[]): Collection[] {
    // Get toplevel collections
    let collections = allCollections.filter(
      (col) => col.parent?.name === '__root_collection__'
    );
    // Find and set child collections, because queried children only have id and name fields
    return collections.map((collection) => {
      const extendedChildren = collection.children?.map((originalChild) => {
        const fullChildCollection = allCollections.find(
          (c) => c.id === originalChild.id
        );
        return {
          ...originalChild,
          ...fullChildCollection,
        };
      });
      return {
        ...collection,
        children: extendedChildren,
      };
    });
  }

  /**
   * Recursively gets childCollections for given collection
   */
  private getChildCollection(
    collection: Collection,
    allCollections: Collection[]
  ): Collection {
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
