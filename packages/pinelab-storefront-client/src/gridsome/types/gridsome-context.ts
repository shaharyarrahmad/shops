import Vue from 'vue';
import {VendureClient} from '../../vendure/vendure.client';
import {ExtendedProduct} from './extended-product';

export class GridsomeContext extends Vue{
    $context!: {
        product?: ExtendedProduct
        products?: ExtendedProduct[]
    };
    $vendure!: VendureClient
}

