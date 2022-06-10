import {
  AvailableCountriesQuery,
  CollectionFieldsFragment,
  OrderFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';
import { VendureClient } from '../../../pinelab-storefront-client';
import mitt, { Emitter } from 'mitt';

export interface ShopData {
  /**
   * All products from store
   */
  products: CalculatedProduct<ProductFieldsFragment>[];
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
  availableCountries: AvailableCountriesQuery['availableCountries'];
}

export interface CollectionMap {
  collection: BasicCollection;
  products: CalculatedProduct<ProductFieldsFragment>[];
}

export type CalculatedProduct<T> = T & {
  lowestPrice: number;
  soldOut: boolean;
};

export interface MinimalProduct {
  id: string;
  slug: string;
  variants: { priceWithTax: number; stockLevel: string }[];
}

export type BasicCollection = Omit<CollectionFieldsFragment, 'productVariants'>;

export interface SortableCollection extends BasicCollection {
  parent?: SortableCollection;
  children?: SortableCollection[];
}

export class Store {
  activeOrder: OrderFieldsFragment | undefined;
}

export interface VueContext {
  $vendure: VendureClient;
  $store: Store;
  $emitter: Emitter<any>;
}
