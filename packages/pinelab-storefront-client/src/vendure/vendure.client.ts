import {Store} from './store';
import {GraphQLClient} from 'graphql-request';

export class VendureClient {

    constructor(private store: Store) {
/*        this.client = new GraphQLClient(process.env.GRIDSOME_VENDURE_API, {
            headers: { 'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN },
        });
        this.getActiveOrder().then((order) => (this.$store.activeOrder = order));*/
    }
}