import {Store} from './store';
import {GraphQLClient} from 'graphql-request';
import {Order} from '..';
import {GET_ACTIVE_ORDER, GET_PRODUCT_STOCK} from './vendure.queries';

export class VendureClient {

    client: GraphQLClient;

    constructor(private store: Store) {
        this.client = new GraphQLClient(process.env.GRIDSOME_VENDURE_API!, {
            headers: { 'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN! },
        });
        this.getActiveOrder().then((order) => (this.store.activeOrder = order));
    }

    async getActiveOrder(): Promise<Order> {
        const { activeOrder } = await this.request(GET_ACTIVE_ORDER);
        this.store.activeOrder = activeOrder;
        return activeOrder;
    }

    async getStockForProducts() {
        const { products } = await this.request(GET_PRODUCT_STOCK);
        return products.items.map((p) => setCalculatedFields(p));
    }

    async request(document: string, variables?: any) {
        const tokenName = 'vendure-auth-token';
        let token = window.localStorage.getItem(tokenName);
        if (token) {
            this.client.setHeader('Authorization', `Bearer ${token}`);
        }
        const { data, headers, errors } = await this.client.rawRequest(
            document,
            variables
        );
        if (errors) {
            throw errors;
        }
        token = headers.get(tokenName);
        if (token) {
            window.localStorage.setItem(tokenName, token);
        }
        return data;
    }
}