import Vue from 'vue';
import { VendureClient } from '../..';
import { CalculatedProduct } from '../../vendure/calculated-product';

export class GridsomeContext extends Vue {
  $context!: {
    product?: CalculatedProduct;
    products?: CalculatedProduct[];
  };
  $vendure!: VendureClient;
}
