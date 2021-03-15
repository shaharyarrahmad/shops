import Component from 'vue-class-component'
import {GridsomeContext} from '../';
import {Product} from '../';

// Define a super class component
@Component
export class ProductsMixin extends GridsomeContext {
    async mounted() {
        const products = await this.$vendure.getStockForProducts();
        // Rehydrate products.soldOut
        this.$context!.products?.forEach((p) => {
            const hydratedProd = products.find((hp: Product) => hp.id === p.id);
            if (hydratedProd) {
               // p.soldOut = hydratedProd.soldOut;
                console.log(`TODO: set stockleven for ${p.name}`);
            }
        });
    }
}