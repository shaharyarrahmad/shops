import {
  AvailableCountriesQuery,
  CollectionFieldsFragment,
  OrderFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';
import { Emitter } from 'mitt';
import { VendureClient } from './vendure.client';

/**
 * Atleast T, but it maybe has more properties.
 * This allows you to access custom graphql fields
 * that are passed to the VendureClient or the ServerSideVendureClient
 */
type Atleast<T> = T & Partial<any>;

export interface StaticData {
  /**
   * All products from store
   */
  products: Atleast<CalculatedProduct<ProductFieldsFragment>>[];
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
  variants: { priceWithTax: number; stockLevel: string; id: string }[];
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

export class VendureError extends Error {
  constructor(
    public message: string,
    public orderCode?: string,
    public errorCode?: string
  ) {
    super(message);
  }
}
