const { GridsomeService } = require('pinelab-storefront-client');
const data = require('./content-data.json');

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

    // ----------------- Shop ---------------------
    createPage({
      path: '/shop/',
      component: './src/templates/Shop.vue',
      context: {
        data,
        products,
        collections,
        breadcrumb: { Home, Shop },
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/shop/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          data,
          product,
          breadcrumb: { Home, Shop, [product.name]: product.slug },
        },
      });
    });

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        data,
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
        data,
        breadcrumb,
      },
    });

    // ----------------- checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        data
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {data}
    });

    // ----------------- static pages ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {data},
    });

  });
};
