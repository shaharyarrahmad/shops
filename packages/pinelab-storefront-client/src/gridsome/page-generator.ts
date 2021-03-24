import { Page, StaticPages } from "../";
import { Collection, CollectionList, Product, ProductList, ProductVariant } from "../../../common";
import { GET_COLLECTIONS, GET_PRODUCTS } from "./gridsome.queries";
import { deduplicate, setCalculatedFields } from "../util/product.util";
import { PageConfig } from "./types/page-config";
import { CalculatedProduct } from "../vendure/calculated-product";

/**
 * Generates Gridsome pages based on given PageMap
 */
export class PageGenerator {
  constructor(private config: PageConfig) {
  }

  /**
   * Generates static html pages for given PageMap templates
   */
  async createStaticPages(pages: StaticPages): Promise<void> {
    let { productList, collectionList } = await this.getData();
    const products = productList.items.map((p: Product) =>
      setCalculatedFields(p)
    );
    products.map((p) => (p.soldOut = false)); // For rendering nothing is soldOut
    if (this.config.productSortFn) {
      products.sort(this.config.productSortFn);
    }
    this.createProductOverview(pages.home, products, collectionList.items);
    this.createProductDetails(pages.productDetail, products);
    this.createCollections(pages.collection, collectionList);
  }

  /**
   *    $context.products: CalculatedProduct[]
   *    $context.collections: Collection[]
   */
  createProductOverview(page: Page, products: CalculatedProduct[], collections: Collection[]): void {
    this.config.createPageFn({
      path: page.slug,
      component: page.template,
      context: {
        products,
        collections
      }
    });
  }

  /**
   *    $context.product: CalculatedProduct
   *    $context.previousPage = '/'
   */
  createProductDetails(page: Page, products: CalculatedProduct[]): void {
    products.forEach((product) => {
      this.config.createPageFn({
        path: `/product/${product.slug}/`,
        component: "./src/templates/Product.vue",
        context: {
          product,
          previousPage: "/"
        }
      });
    });
  }

  /**
   *    $context.collection: Collection[] without productVariants
   *    $context.products: CalculatedProduct[] products for this collection
   *    $context.previousPage = '/'
   */
  createCollections(page: Page, collectionList: CollectionList): void {
    collectionList.items.forEach((collection: Collection) => {
      let productsPerCollection: Product[] = collection.productVariants.items.map(
        (variant: ProductVariant) => variant.product
      );
      productsPerCollection = deduplicate(productsPerCollection);
      productsPerCollection = productsPerCollection.map((p) =>
        setCalculatedFields(p)
      );
      collection.productVariants.items = []; // We don't need this in __initial_state__, saves some Kb data
      this.config.createPageFn({
        path: `/${collection.slug}/`,
        component: "./src/templates/ProductOverview.vue",
        context: {
          collection,
          products: productsPerCollection,
          previousPage: "/"
        }
      });
    });
  }

  /**
   * Gets all data from Vendure, via the Gridsome GraphQL API
   */
  async getData(): Promise<{
    productList: ProductList;
    collectionList: CollectionList;
  }> {
    let [
      {
        data: {
          Vendure: { products }
        }
      },
      {
        data: {
          Vendure: { collections }
        }
      }
    ] = await Promise.all([
      this.config.graphqlFn(GET_PRODUCTS),
      this.config.graphqlFn(GET_COLLECTIONS)
    ]);
    return {
      productList: products,
      collectionList: collections
    };
  }
}
