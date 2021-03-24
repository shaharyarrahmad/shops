import { Product } from '../../../common';

export interface CalculatedProduct extends Product {
  lowesPrice: number;
  soldOut: boolean;
}
