import {Product} from '..';

export interface Mixin {
    $context?: {
        products?: Product[],
        product?: Product,
    },
    [key: string]: any,
}

