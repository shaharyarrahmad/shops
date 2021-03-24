import { CalculatedProduct } from '../../vendure/calculated-product';

export interface PageConfig {
  graphqlFn: Function;
  createPageFn: Function;
  /**
   * Sort products by custom sortFunction
   */
  productSortFn?: (a: CalculatedProduct, b: CalculatedProduct) => number;
}
