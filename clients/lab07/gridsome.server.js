const { GET_CONTENT } = require('./content.queries');
const { VendureServer } = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');

module.exports = function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const directus = new GraphQLClient(
      `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
    );

    const [
      { products, collections, productsPerCollection, availableCountries },
      { lab07_projects: projects },
    ] = await Promise.all([
      vendureServer.getShopData(),
      directus.request(GET_CONTENT),
    ]);

    products.reverse();

    const global = {
      // TODO add email and stuff
    };

    // Breadcrumb pages
    const Home = '/';
    const Shop = '/shop/';
    const About = '/over-ons';
    const Winkelmand = '/winkelmand/';
    const Checkout = '/checkout/';

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
        projects,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/shop/${product.slug}/`,
        component: './src/templates/ProductDetail.vue',
        context: {
          product,
          previousPage: '/',
        },
      });
    });

    // ----------------- Shop ---------------------
    createPage({
      path: '/shop/',
      component: './src/templates/Shop.vue',
      context: {
        ...global,
        products,
        collections,
        breadcrumb: { Home, Shop },
      },
    });

    // ----------------- About  ---------------------
    createPage({
      path: '/over-ons/',
      component: './src/templates/About.vue',
      context: {
        ...global,
        breadcrumb: { Home, About },
        content: 'text',
      },
    });

    // ----------------- Collections ---------------------
    productsPerCollection.forEach(
      ({ products: productsPerCollection, collection }) => {
        createPage({
          path: `/shop/${collection.slug}`,
          component: './src/templates/Shop.vue',
          context: {
            ...global,
            products: productsPerCollection,
            collection,
            collections,
            breadcrumb: { Home, Shop, [collection.name]: collection.slug },
          },
        });
      }
    );

    // ----------------- Cart ---------------------
    createPage({
      path: '/winkelmand/',
      component: './src/templates/Cart.vue',
      context: {
        ...global,
        breadcrumb: { Home, Shop, Winkelmand },
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { ...global, availableCountries },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: { ...global },
    });
  });
};
