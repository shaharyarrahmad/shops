const { GridsomeService } = require('pinelab-storefront-client');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const { products, collections } = await gridsome.getShopData();
    const featuredProducts = products.filter(p => p.facetValues.find(value => value.code === 'featured'));

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products,
        collections,
        featuredProducts
      },
    });
  });
};
