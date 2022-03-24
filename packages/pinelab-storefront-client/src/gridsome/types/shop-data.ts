import { Collection, Country } from '../../generated/graphql';
import { CalculatedProduct } from '../../util/product.util';

export interface ShopData {
  /**
   * All products from store
   */
  products: CalculatedProduct[];
  /**
   * Products with variants per collection
   */
  productsPerCollection: CollectionMap[];
  /**
   * All collections from the store
   * DOES NOT INCLUDE VARIANTS. Just basic collection info
   */
  collections: BasicCollection[];
  /**
   * List of {code,name} countries for shippingAddress. Used by CheckoutComponent
   */
  availableCountries: Country[];
}

export interface CollectionMap {
  collection: BasicCollection;
  products: CalculatedProduct[];
}

export type BasicCollection = Omit<Collection, 'productVariants'>;
