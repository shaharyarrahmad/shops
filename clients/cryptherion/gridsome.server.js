const { GridsomeService } = require('pinelab-storefront-client');
const _ = require('lodash');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async function (api) {
  /*
  api.chainWebpack(config => {
    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
  });
*/

  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const {
      products,
      availableCountries,
      collections: allCollections,
      productsPerCollection,
    } = await gridsome.getShopData();

    const featuredProduct = products.find((p) =>
      p.facetValues.find((value) => value.code === 'main-feature')
    );

    // Get toplevel collections
    const collections = gridsome.unflatten(allCollections);

    // Breadcrumb
    const Home = '/';
    const Winkelmand = '/cart/';
    const Checkout = '/cart/checkout';

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products,
        featuredProduct,
        collections,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      const collectionMap = productsPerCollection.find((collectionMap) =>
        collectionMap.products.find((p) => p.slug === product.slug)
      );
      const breadcrumb = {
        Home,
      };
      if (collectionMap && collectionMap.collection) {
        const collection = collectionMap.collection;
        // add parentCollection to breadcrumb
        if (collection.parent.name !== '__root_collection__') {
          breadcrumb[
            collection.parent.name
          ] = `/categorie/${collection.parent.slug}/`;
        }
        // add collection to breadcrumb
        breadcrumb[collection.name] = `/categorie/${collection.slug}/`;
      }
      breadcrumb[product.name] = product.slug;
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          collections,
          product,
          breadcrumb,
        },
      });
    });

    // ----------------- Collections ---------------------
    productsPerCollection.forEach(({ products, collection }) => {
      const breadcrumb = { Home };
      let parent;
      if (collection.parent.name !== '__root_collection__') {
        parent = collection.parent;
        breadcrumb[
          collection.parent.name
        ] = `/categorie/${collection.parent.slug}/`;
      }
      breadcrumb[collection.name] = `/categorie/${collection.slug}/`;
      const siblings = allCollections.filter(
        (c) => c.parent.id === collection.parent.id
      );
      const children = collection.children.map((child) =>
        allCollections.find((col) => col.id === child.id)
      );
      children.forEach((childCollection) => {
        // Get child products
        const childProducts =
          productsPerCollection.find(
            (p) => p.collection.name === childCollection.name
          )?.products || [];
        products.push(...childProducts);
      });
      createPage({
        path: `/categorie/${collection.slug}`,
        component: './src/templates/Collection.vue',
        context: {
          products: _.uniqBy(products, 'slug'),
          collection,
          parentCollection: parent,
          siblingCollections: siblings,
          childCollections: children,
          collections,
          breadcrumb,
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        collections,
        back: '/',
        breadcrumb: { Home, Winkelmand },
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { availableCountries, collections, hideNavBar: true },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        collections,
        back: '/',
      },
    });
  });
};
