const {GraphQLClient} = require('graphql-request');
const {getStockForProducts} = require('./client.queries');

module.exports = {

    client: new GraphQLClient(process.env.GRIDSOME_VENDURE_API, {
        headers: {'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN},
    }),

    getProductStock: async function () {
        const {products} = await this.request(getStockForProducts);
        return products.items.map((p) => this.setCalculatedFields(p));
    },

    request: async function (document, variables) {
        const tokenName = 'vendure-auth-token';
        let token = window.localStorage.getItem(tokenName);
        if (token) {
            this.client.setHeader('Authorization', `Bearer ${token}`);
        }
        const {data, headers, errors} = await this.client.rawRequest(document, variables);
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
    setCalculatedFields: function (product) {
        const defaultPrice = Math.min(...product.variants.map(v => v.priceWithTax));
        const available = product.variants.find(v => v.available > 0);
        return {
            ...product,
            defaultPrice,
            soldOut: !available
        };
    },
    /**
     * Set lowest price based on lowest price of variants
     */
    setDefaultPrice: function (product) {
        const defaultPrice = Math.min(...product.variants.map(v => v.priceWithTax));
        return {
            ...product,
            defaultPrice,
        };
    }
}
