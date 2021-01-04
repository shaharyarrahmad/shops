const {GraphQLClient} = require('graphql-request');
const {getStockForProductsQuery, getProductQuery, addItemToOrderMutation} = require('./client.queries');

const Vendure = {
    client: new GraphQLClient(process.env.GRIDSOME_VENDURE_API, {
        headers: {'vendure-token': process.env.GRIDSOME_VENDURE_TOKEN},
    }),

    async getStockForProducts() {
        const {products} = await this.request(getStockForProductsQuery);
        return products.items.map((p) => this.setCalculatedFields(p));
    },

    async getProduct(slug) {
        const {product} = await this.request(getProductQuery, {slug});
        return this.setCalculatedFields(product);
    },

    async addProductToCart(productVariantId, quantity) {
        const {addItemToOrder: order} = await this.request(addItemToOrderMutation, {productVariantId, quantity});
        this.validateResult(order);
        this.activeOrder$.next(order);
        await this.setLowestShippingMethod();
        return order;
    },


    async request(document, variables) {
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
    }
}

module.exports = {
    Vendure
}
