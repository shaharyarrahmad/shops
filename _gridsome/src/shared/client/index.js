import {GraphQLClient} from 'graphql-request';
import {print} from 'graphql/language/printer';
import {getStockForProducts} from './client.queries';

export const Index = {

    client: new GraphQLClient(process.env.GRIDSOME_VENDURE_API, {
        headers: {'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN},
    }),

    getProductStock: async () => {
        const {products} = await Index.request(getStockForProducts);
        return products?.items.map((p) => Index.setCalculatedFields(p));
    },

    request: async (document, variables) => {
        const tokenName = 'vendure-auth-token';
        let token = window.localStorage.getItem(tokenName);
        if (token) {
            Index.client.setHeader('Authorization', `Bearer ${token}`);
        }
        const {data, headers, errors} = await Index.client.rawRequest(print(document), variables);
        if (errors) {
            throw errors;
        }
        token = headers.get(tokenName);
        if (token) {
            window.localStorage.setItem(tokenName, token);
        }
        return data;
    },

    /**
     * Set lowest price based on lowest price of variants and set soldout if all are sold out
     */
    setCalculatedFields: (product) => {
        const defaultPrice = Math.min(...product.variants.map(v => v.priceWithTax));
        const available = product.variants.find(v => v.available > 0);
        return {
            ...product,
            defaultPrice,
            soldOut: !available
        };
    }
}
