import {Product} from '../..';

export interface ExtendedProduct extends Product {
    soldOut: boolean;
    defaultPrice: number;
}