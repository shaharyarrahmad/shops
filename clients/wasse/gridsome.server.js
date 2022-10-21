const {
  VendureServer,
  SearchUtil,
  deduplicate,
} = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');
const { mapToMinimalCollection } = require('./util');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );

    const {
      // Vendure content
      products: allProducts,
      availableCountries,
      collections: allCollections,
      productsPerCollection,
    } = await vendureServer.getShopData();

    // Set absolute path for product.url and collection.url: product.url = '/product/lavameel/'
    const categoryPrefix = 'product-categorie';
    const productPrefix = 'product';
    allCollections.forEach(
      (colllection) =>
        (colllection.url = `/${categoryPrefix}/${colllection.slug}/`)
    );
    allProducts.forEach(
      (product) => (product.url = `/${productPrefix}/${product.slug}/`)
    );
    productsPerCollection.forEach((collectionMap) => {
      collectionMap.products.forEach(
        (product) => (product.url = `/${productPrefix}/${product.slug}/`)
      );
    });

    const collections = vendureServer.unflatten(allCollections);
    const navbarCollections = collections.map(mapToMinimalCollection);

    const global = {
      navbarCollections,
    };
    console.log(navbarCollections);

    // -------------------- Home -----------------------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
      },
    });

    // -------------------- ProductDetail -----------------------------------
    allProducts.forEach((product) => {
      createPage({
        path: product.url,
        component: './src/templates/ProductDetail.vue',
        context: {
          ...global,
          product,
        },
      });
    });
  });
};
