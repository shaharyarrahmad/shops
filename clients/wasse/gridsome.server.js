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

    // TODO for every collection set prefix

    const collections = vendureServer.unflatten(allCollections);
    const navbarCollections = collections
      .filter((col) => col.name !== 'highlights')
      .map(mapToMinimalCollection);

    const global = {
      navbarCollections,
      categorySlugPrefix: 'product-categorie',
    };

    // -------------------- Home -----------------------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
      },
    });
  });
};
