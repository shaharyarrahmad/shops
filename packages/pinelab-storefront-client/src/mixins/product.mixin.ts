import {Mixin} from '../types/mixin';
import {Product} from '..';

/**
 * All product detail related logic
 */
export const ProductDetail = {
    data() {
      return {
          products: [] as Product[]
      }
    },
    mounted() {
        (this as any).products = (this as Mixin).$context!.products?.map(p => ({
            ...p,
            name: 'Sophia'
        }));
    }
};

