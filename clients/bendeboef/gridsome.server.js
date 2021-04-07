const { GridsomeService } = require('pinelab-storefront-client');

module.exports = async function (api) {
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
  });
};
