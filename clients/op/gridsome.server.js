const { GridsomeService } = require('pinelab-storefront-client');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);

    const { products } = await gridsome.getShopData();

    const global = {
      email: 'info@ophetboek.nl',
      instagram: 'https://www.instagram.com/tipvanjet/',
      facebook: 'https://www.facebook.com/jetvnieuwkerk/',
    };

    if (!products || !products.length) {
      throw Error(`No products found!`);
    }

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        product: products[0],
        global,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        product: products[0],
        global,
      },
    });
  });
};
