const { GridsomeService } = require('pinelab-storefront-client');
const { GET_CONTENT } = require('./content.queries');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const [shopData, content] = await Promise.all([
      gridsome.getShopData(),
      graphql(GET_CONTENT)
    ]);
    const { products, collections, productsPerCollection } = shopData;
    const {data: {Directus: {supera_algemeen: global, supera_home: home, supera_news: news}}} = content;

    const featuredProducts = products.filter((p) =>
      p.facetValues.find((value) => value.code === 'featured')
    );

    // Breadcrumb pages
    const Home = '/';
    const Shop = '/shop/';
    const Cart = '/cart/';
    const Checkout = '/checkout/';
    const Portfolio = '/portfolio/';
    const Bio = '/bio/';

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        global,
        home,
        news,
        products,
        collections,
        featuredProducts,
      },
    });

    // ----------------- Shop ---------------------
    createPage({
      path: '/shop/',
      component: './src/templates/Shop.vue',
      context: {
        global,
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
          global,
          product,
          breadcrumb: { Home, Shop, [product.name]: product.slug },
        },
      });
    });

    // ----------------- Static pages ---------------------
    createPage({
      path: '/portfolio/',
      component: './src/templates/Portfolio.vue',
      context: {
        global,
        breadcrumb: { Home, Portfolio },
      },
    });

/*    data.portfolio.subpages.forEach((page) => {
      createPage({
        path: `/portfolio/${page.slug}`,
        component: './src/templates/Projects.vue',
        context: {
          global,
          page,
          breadcrumb: {
            Home,
            Portfolio,
            [page.title]: `/portfolio/${page.slug}`,
          },
        },
      });
    });*/

    createPage({
      path: '/bio/',
      component: './src/templates/Bio.vue',
      context: {
        global,
        breadcrumb: { Home, Bio },
      },
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        global,
        breadcrumb: { Home, Shop, Cart },
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { global },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: { global },
    });
  });
};
