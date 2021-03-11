import Vue from 'vue'
import Component from 'vue-class-component'
import {GridsomeContext, Product} from '../';

// Define a super class component
@Component
export class ProductsMixin extends GridsomeContext {
    async mounted() {
        const products = await this.$vendure.getStockForProducts();
        // Rehydrate products.soldOut
        this.$context!.products?.forEach((p) => {
            const hydratedProd = products.find((hp: Product) => hp.id === p.id);
            if (hydratedProd) {
                p.soldOut = hydratedProd.soldOut;
            }
        });
    }
}



/*
export const productMixin = {
    data() {
      return {
          products: [] as Product[]
      }
    },
    mounted() {

        (this as any).products = (this as any).$context!.products?.map((p: Product) => ({
            ...p,
            name: 'Martijn test'
        }));
    }
};

*/
