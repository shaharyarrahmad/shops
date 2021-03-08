import {Order} from '../generated/graphql';

export class Store {
    activeOrder: Order | undefined;
}