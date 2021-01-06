const {setCalculatedFields, Vendure} = require('./src/vendure');
const {productsQuery, collectionsQuery} = require('./src/server.queries');

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

        products = products.map(p => setCalculatedFields(p));

        // product detail
        products.forEach((product) => {
            createPageFn({
                path: `/product/${product.slug}`,
                component: './src/templates/Product.vue',
                context: {
                    product,
                    previousPage: '/'
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
    configureVue: function (Vue, isClient) {
        // Add euro filter for global use
        Vue.filter('euro', function (value, format) {
            if (!value) {
                value = 0;
            }
            const currencyString = `€${(value / 100).toFixed(2).replace('.', ',')}`;
            if (currencyString.endsWith('00') && !format) {
                return currencyString.replace(new RegExp('00$'), '-');
            }
            return currencyString;
        });
        // Set global store and vendure service
        if (isClient) {
            const store = Vue.observable({
                activeOrder: {},
            });
            Vue.prototype.$vendure = new Vendure(store);
            Vue.prototype.$store = store;
        }
    }
}