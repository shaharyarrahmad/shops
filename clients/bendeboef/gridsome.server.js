const { GridsomeService } = require('pinelab-storefront-client');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const { products, collections } = await gridsome.getShopData();
    const featuredProducts = products.filter((p) =>
      p.facetValues.find((value) => value.code === 'featured')
    );

    // Breadcrumb pages
    const Home = '/';
    const Shop = '/shop/';
    const Cart = '/cart/';
    const Checkout = '/checkout';

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products,
        collections,
        featuredProducts,
      },
    });

    // ----------------- Cart ---------------------
    const breadcrumb = { Home, Shop, Cart };
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        breadcrumb,
      },
    });

    // ----------------- checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {},
    });
  });
};
