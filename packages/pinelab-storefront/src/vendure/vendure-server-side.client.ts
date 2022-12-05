import { gql, GraphQLClient } from 'graphql-request';
import {
  AllProductsQuery,
  AllProductsQueryVariables,
  AvailableCountriesQuery,
  CollectionFieldsFragment,
  CollectionsQuery,
  CollectionsQueryVariables,
  ProductFieldsFragment,
} from '../generated/graphql';
import {
  BasicCollection,
  CalculatedProduct,
  CollectionMap,
  StaticData,
  SortableCollection,
} from './types';
import { deduplicate, setCalculatedFields } from '../util/product.util';
import { AdditionalVendureFields, getVendureQueries } from './vendure.queries';

/**
 * Server side Vendure client for fetching static data like collections and products
 * This client cannot handle session aware mutations and queries like adding items to cart.
 */
export class VendureServerSideClient {
  private readonly client: GraphQLClient;
  private queries: ReturnType<typeof getVendureQueries>;

  constructor(
    url: string,
    channelToken: string,
    additionalGraphqlFields: Pick<
      AdditionalVendureFields,
      'additionalCollectionFields' | 'additionalProductFields'
    >
  ) {
    this.client = new GraphQLClient(url, {
      headers: {
        'vendure-token': channelToken,
      },
    });
    this.queries = getVendureQueries(additionalGraphqlFields);
  }

  /**
   * Get data like products and collections from Vendure for generating a static storefront
   */
  async getStaticData(): Promise<StaticData> {
    let [collectionList, allProducts, availableCountries] = await Promise.all([
      this.getAllCollections(),
      this.getAllProducts(),
      this.getAvailableCountries(),
    ]);
    const products = allProducts.map((p) => setCalculatedFields(p));
    products.map((p) => (p.soldOut = false));

    const productsPerCollection: CollectionMap[] = collectionList.map(
      (collection) => {
        const products = this.getProductsForCollection(collection, allProducts);
        return {
          collection: { ...collection, productVariants: undefined },
          products,
        };
      }
    );
    const collections: BasicCollection[] = collectionList.map((c) => ({
      ...c,
      productVariants: undefined,
    }));
    return {
      products,
      productsPerCollection,
      collections,
      availableCountries,
    };
  }

  /**
   * Find products that belong to the given Collection
   */
  getProductsForCollection(
    collection: CollectionFieldsFragment,
    allProducts: ProductFieldsFragment[]
  ): CalculatedProduct<ProductFieldsFragment>[] {
    let productsPerCollection: ProductFieldsFragment[] =
      collection.productVariants.items
        .map((variant) =>
          allProducts.find((product) => product.id === variant.product.id)
        )
        .filter((product): product is ProductFieldsFragment => !!product);
    productsPerCollection = deduplicate(productsPerCollection);
    return productsPerCollection.map((p) => setCalculatedFields(p));
  }

  async getAllCollections(): Promise<CollectionFieldsFragment[]> {
    const {
      collections: { items },
    } = await this.client.request<CollectionsQuery, CollectionsQueryVariables>(
      this.queries.GET_COLLECTIONS
    );
    return items;
  }

  /**
   * Get products in batches
   */
  async getAllProducts(): Promise<ProductFieldsFragment[]> {
    const products: ProductFieldsFragment[] = [];
    let hasMore = true;
    let page = 1;
    let skip = 0;
    const take = 500;
    while (hasMore) {
      const { products: productList } = await this.client.request<
        AllProductsQuery,
        AllProductsQueryVariables
      >(this.queries.GET_PRODUCTS, {
        options: {
          skip,
          take,
        },
      });
      products.push(...productList.items);
      skip = page * take;
      page++;
      hasMore = productList.totalItems > products.length;
    }
    return products;
  }

  async getAvailableCountries(): Promise<
    AvailableCountriesQuery['availableCountries']
  > {
    const { availableCountries } =
      await this.client.request<AvailableCountriesQuery>(
        this.queries.GET_AVAILABLE_COUNTRIES
      );
    return availableCountries;
  }

  /**
   * By default the collection graphql query returns all child and parent collections in one flat array.
   * This function sets the correct childCollections for each topLevel collection.
   * @param allCollections
   */
  unflatten(allCollections: BasicCollection[]): SortableCollection[] {
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
  private getChildCollection(
    collection: BasicCollection,
    allCollections: BasicCollection[]
  ): SortableCollection {
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
    } as SortableCollection;
  }
}
