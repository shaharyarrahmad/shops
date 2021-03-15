import Vue from 'vue';
import {Product, VendureClient} from '../../';

export class GridsomeContext extends Vue{
    $context!: {
        product?: Product
        products?: Product[]
    };
    $vendure!: VendureClient
}

