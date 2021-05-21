const { GridsomeService } = require('pinelab-storefront-client');

module.exports = async function(api) {
  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const { products, collections, productsPerCollection } = await gridsome.getShopData();
    const featuredProducts = products.filter((p) =>
      p.facetValues.find((value) => value.code === 'featured')
    );

    // Breadcrumb pages
    const Home = '/';
    const Shop = '/shop/';
    const Cart = '/cart/';
    const Checkout = '/checkout/';

    // ----------------- Index ---------------------
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

    // ----------------- Collections ---------------------
    const collectionPrefix = 'product-category';
    productsPerCollection.forEach(productCollection => {
      const collectionSlug = `/${collectionPrefix}/${productCollection.collection.slug}`;
      const collectionName = productCollection.collection.name;
      createPage({
        path: `/${collectionPrefix}/${productCollection.collection.slug}`,
        component: './src/templates/Shop.vue',
        context: {
          products: productCollection.products,
          collections,
          selectedCollection: productCollection.collection,
          breadcrumb: { Home, Shop, [collectionName]: collectionSlug }
        }
      });
    });


    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        breadcrumb: { Home, Shop, Cart }
      }
    });

    // ----------------- Checkout ---------------------
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
