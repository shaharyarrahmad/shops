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

  const findByFacet = (products, code) =>
    products.find((p) => p.facetValues.find((f) => f.code === code));
  const filterByFacet = (products, code) =>
    products.filter((p) => p.facetValues.find((f) => f.code === code));

  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const {
      products: allProducts,
      availableCountries,
      collections: allCollections,
      productsPerCollection,
    } = await gridsome.getShopData();

    const products = allProducts.map((p) => {
      const facetValue = p.facetValues.find(
        (facetValue) => facetValue.facet.code === 'category-3'
      );
      p.category = facetValue ? facetValue.name : undefined;
      return p;
    });

    const collections = gridsome.unflatten(allCollections);
    const global = {
      collections,
      instagram: 'https://www.instagram.com/cantastic.nl/',
      facebook: 'https://www.facebook.com/cantastic.nl/',
    };

    const highlight1 = findByFacet(products, 'highlight1');
    const highlight2 = findByFacet(products, 'highlight2');
    const highlight3 = findByFacet(products, 'highlight3');
    const favorites = filterByFacet(products, 'favorite');

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
        products,
        highlight1,
        highlight2,
        highlight3,
        favorites,
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
