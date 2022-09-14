const { VendureServer } = require('pinelab-storefront');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    let { products, availableCountries, collections, productsPerCollection } =
      await vendureServer.getShopData();
      collections = vendureServer.unflatten(collections);

    console.log(JSON.stringify(products));

    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products, 
        categories: collections,
      },
    });
  });
};
