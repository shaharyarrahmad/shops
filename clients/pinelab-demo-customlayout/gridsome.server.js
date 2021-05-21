const { GridsomeService } = require('pinelab-storefront-client');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async function(api) {

/*  api.chainWebpack(config => {
    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
  });*/

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
        featuredProducts
      }
    });

    // ----------------- Shop ---------------------
    createPage({
      path: '/shop/',
      component: './src/templates/Shop.vue',
      context: {
        products,
        collections,
        breadcrumb: { Home, Shop }
      }
    });

    // ----------------- ProductDetail ---------------------
    products.forEach(product => {
      createPage({
        path: `/shop/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          product,
          breadcrumb: { Home, Shop, [product.name]: product.slug }
        }
      });
    });

    // ----------------- Cart ---------------------
    const breadcrumb = { Home, Shop, Cart };
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        breadcrumb
      }
    });

    // ----------------- checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {}
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue'
    });
  });
};
