const {productsQuery} = require('./src/server.queries');
const {collectionsQuery} = require('./src/server.queries');
const Vendure = require('./src/vendure');

/**
 * Used by gridsome.server.config.js. Populates the context with data needed for static sites
 */
module.exports = {
    createPages: async (createPageFn, graphql) => {
        let [
            {data: {Vendure: {products: {items: products}}}},
            {data: {Vendure: {collections: {items: collections}}}}
        ] = await Promise.all([
            graphql(productsQuery),
            graphql(collectionsQuery)
        ]);

        products = products.map(p => Vendure.setDefaultPrice(p));

        // product detail
        products.forEach((product) => {
            createPageFn({
                path: `/product/${product.slug}`,
                component: './src/templates/Product.vue',
                context: {
                    product
                }
            })
        });

        // product overview
        createPageFn({
            path: `/`,
            component: './src/templates/Index.vue',
            context: {
                products,
                collections
            }
        });
    },
    /**
     * Configure global Vue stuff
     */
    configureVue: function (Vue) {
        Vue.filter('euro', function (value, format) {
            if (!value) {
                value = 0;
            }
            const currencyString = `€${(value / 100).toFixed(2).replace('.', ',')}`;
            if (currencyString.endsWith('00') && !format) {
                return currencyString.replace(new RegExp('00$'), '-');
            }
            return currencyString;
        })
    }
}