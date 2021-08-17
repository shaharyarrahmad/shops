const { GridsomeService } = require('pinelab-storefront-client');
const data = require('./content-data.json');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const { products, collections, productsPerCollection } =
      await gridsome.getShopData();

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

    // ----------------- Collections ---------------------
    productsPerCollection.forEach(
      ({ products: productsPerCollection, collection }) => {
        createPage({
          path: `/shop/${collection.slug}`,
          component: './src/templates/Shop.vue',
          context: {
            data,
            products: productsPerCollection,
            collection,
            collections,
            breadcrumb: { Home, Shop, [collection.name]: collection.slug },
          },
        });
      }
    );

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/shop/${product.slug}`,
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
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        data,
        breadcrumb: { Home, Shop, Cart },
      },
    });

    // ----------------- checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        data,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: { data },
    });

    // ----------------- static pages ---------------------
    createPage({
      path: '/tattoos/',
      component: './src/templates/Tattoos.vue',
      context: {
        data,
        breadcrumb: { Home, Tattoos },
      },
    });

    createPage({
      path: '/contact/',
      component: './src/templates/Contact.vue',
      context: {
        data,
        breadcrumb: { Home, Contact },
      },
    });
  });
};
