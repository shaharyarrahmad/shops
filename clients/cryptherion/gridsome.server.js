const { GridsomeService } = require('pinelab-storefront-client');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async function (api) {
  /*
  api.chainWebpack(config => {
    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
  });
*/

  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const { products, availableCountries, collections, productsPerCollection } =
      await gridsome.getShopData();

    const featuredProduct = products.find((p) =>
      p.facetValues.find((value) => value.code === 'main-feature')
    );

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products,
        featuredProduct,
        collections,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          collections,
          product,
          back: '/',
        },
      });
    });

    // ----------------- Collections ---------------------
    productsPerCollection.forEach(
      ({ products: productsPerCollection, collection }) => {
        createPage({
          path: `/categorie/${collection.slug}`,
          component: './src/templates/Collection.vue',
          context: {
            products: productsPerCollection,
            collection,
            collections,
          },
        });
      }
    );

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        collections,
        back: '/',
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { availableCountries, collections },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        collections,
        back: '/',
      },
    });
  });
};
