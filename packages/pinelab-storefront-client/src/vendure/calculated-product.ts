import { Product } from '../../../common';

export interface CalculatedProduct extends Product {
  lowestPrice: number;
  soldOut: boolean;
}
