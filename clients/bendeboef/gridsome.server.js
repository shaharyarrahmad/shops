const { GridsomeService } = require('pinelab-storefront-client');
const { GET_GLOBAL, GET_HOME, PREFIX } = require('./content.queries');

module.exports = async function(api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const [
      shopData,
      globalData,
      homeData
    ] = await Promise.all([
      gridsome.getShopData(),
      graphql(GET_GLOBAL),
      graphql(GET_HOME)
    ]);
    const { products, collections, productsPerCollection } = shopData;
    const { data: { [PREFIX]: { bdb_algemeen: global } } } = globalData;
    const { data: { [PREFIX]: { bdb_home: home } } } = homeData;

    // Static pages should never have soldOut products, this is updated when mounted()
    products.forEach((p) => (p.soldOut = false));

    const featuredProducts = products.filter((p) =>
      p.facetValues.find((value) => value.code === 'featured')
    );

    // Breadcrumb pages
    const Home = '/';
    const Shop = '/shop/';
    const Cart = '/cart/';
    const Checkout = '/checkout/';
    const Tattoos = '/tattoos/';
    const Contact = '/contact/';

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        global,
        home,
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
        global,
        products,
        collections,
        breadcrumb: { Home, Shop }
      }
    });

    // ----------------- Collections ---------------------
    productsPerCollection.forEach(
      ({ products: productsPerCollection, collection }) => {
        createPage({
          path: `/shop/${collection.slug}`,
          component: './src/templates/Shop.vue',
          context: {
            global,
            products: productsPerCollection,
            collection,
            collections,
            breadcrumb: { Home, Shop, [collection.name]: collection.slug }
          }
        });
      }
    );

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/shop/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          global,
          product,
          breadcrumb: { Home, Shop, [product.name]: product.slug }
        }
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        global,
        breadcrumb: { Home, Shop, Cart }
      }
    });

    // ----------------- checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        global
      }
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: { global }
    });

    // ----------------- static pages ---------------------
    createPage({
      path: '/tattoos/',
      component: './src/templates/Tattoos.vue',
      context: {
        global,
        breadcrumb: { Home, Tattoos }
      }
    });

    createPage({
      path: '/contact/',
      component: './src/templates/Contact.vue',
      context: {
        global,
        breadcrumb: { Home, Contact }
      }
    });

  });

};
