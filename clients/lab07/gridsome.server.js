const { GridsomeService } = require('pinelab-storefront-client');

module.exports = function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const data = await gridsome.getShopData();

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/ProductsTemplate.vue',
      context: {
        products: data.products,
        collections: data.collections,
      },
    });

    // ----------------- ProductDetail ---------------------
    data.products.forEach((product) => {
      createPage({
        path: `/product/${product.slug}/`,
        component: './src/templates/ProductTemplate.vue',
        context: {
          product,
          previousPage: '/',
        },
      });
    });

    // ----------------- Collection pages ---------------------
    data.productsPerCollection.forEach((collectionMap) => {
      createPage({
        path: `/${collectionMap.collection.slug}/`,
        component: './src/templates/ProductsTemplate.vue',
        context: {
          products: collectionMap.products,
          collection: collectionMap.collection,
          previousPage: '/',
        },
      });
    });
  });
};
