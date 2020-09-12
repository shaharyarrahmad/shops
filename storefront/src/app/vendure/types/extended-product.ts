import {Product} from '../../../generated/graphql';

/**
 * Product with a default price added
 */
export interface ExtendedProduct extends Product {
  defaultPrice;
}
