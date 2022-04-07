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
    const {
      products,
      availableCountries,
      collections: allCollections,
      productsPerCollection,
    } = await gridsome.getShopData();

    const collections = gridsome.unflatten(allCollections);
    const global = {
      collections,
    };

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
        products,
        highlight1: products.find((p) =>
          p.facetValues.find((f) => f.code === 'highlight1')
        ),
        highlight2: products.find((p) =>
          p.facetValues.find((f) => f.code === 'highlight2')
        ),
        highlight3: products.find((p) =>
          p.facetValues.find((f) => f.code === 'highlight3')
        ),
        usps: [
          '<p>Vanaf €75 <b>gratis</b> verzending</p>',
          '<p><b>Achteraf</b> betalen</p>',
          '<p><b>Exclusieve</b> producten</p>',
          '<p>Ook wel eens <b>gearresteerd</b></p>',
        ],
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          ...global,
          product,
          showBack: true,
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        ...global,
        showBack: true,
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        ...global,
        availableCountries,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        ...global,
        showBack: true,
      },
    });
  });
};
