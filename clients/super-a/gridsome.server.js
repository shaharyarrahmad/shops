const { GridsomeService } = require('pinelab-storefront-client');
const data = require('./content-data.json');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const {
      products,
      collections,
      productsPerCollection,
    } = await gridsome.getShopData();
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
        products,
        collections,
        featuredProducts,
        data
      },
    });

    // ----------------- Shop ---------------------
    createPage({
      path: '/shop/',
      component: './src/templates/Shop.vue',
      context: {
        products,
        collections,
        data,
        breadcrumb: { Home, Shop },
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/shop/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          product,
          data,
          breadcrumb: { Home, Shop, [product.name]: product.slug },
        },
      });
    });

    // ----------------- Static pages ---------------------
    createPage({
      path: '/portfolio/',
      component: './src/templates/Portfolio.vue',
      context: {
        data,
        breadcrumb: { Home, Portfolio },
      },
    });

    data.portfolio.subpages.forEach(page => {
      createPage({
        path: `/portfolio/${page.slug}`,
        component: './src/templates/PortfolioCategory.vue',
        context: {
          data,
          page,
          breadcrumb: { Home, Portfolio, [page.title]: `/portfolio/${page.slug}` },
        },
      });
    });

    createPage({
      path: '/bio/',
      component: './src/templates/Bio.vue',
      context: {
        data,
        breadcrumb: { Home, Bio },
      },
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        data,
        breadcrumb: { Home, Shop, Cart },
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {data},
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {data}
    });
  });
};
