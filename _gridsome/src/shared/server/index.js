const {getProducts} = require('./server.queries');

module.exports = {
    configure: {
        createPages: async (createPageFn, graphql) => {
            const {data: {Vendure: {products: {items}}}} = await graphql(getProducts);
            items.forEach((product) => {
                createPageFn({
                    path: `/product/${product.slug}`,
                    component: './src/templates/Product.vue',
                    context: {
                        product
                    }
                })
            });
            createPageFn({
                path: `/`,
                component: './src/templates/Index.vue',
                context: {
                    products: items
                }
            });
        }
    }
}