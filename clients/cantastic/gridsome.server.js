const { GridsomeService } = require('pinelab-storefront-client');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async function (api) {
  /*
  api.chainWebpack(config => {
    config
      .plugin('BundleAnalyzerPlugin')
      .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
  });
*/

  // Breadcrumb pages
  const Home = '/';

  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const {
      products: allProducts,
      availableCountries,
      collections: allCollections,
      productsPerCollection,
    } = await gridsome.getShopData();

    // Set category field on products
    const products = allProducts.map((p) => {
      const facetValue = p.facetValues.find(
        (facetValue) => facetValue.facet.code === 'category-3'
      );
      p.category = facetValue ? facetValue.name : undefined;
      return p;
    });

    const collections = gridsome.unflatten(allCollections);
    const global = {
      collections,
      instagram: 'https://www.instagram.com/cantastic.nl/',
      facebook: 'https://www.facebook.com/cantastic.nl/',
      usps: [
        '<p>Vanaf €75 <b>gratis</b> verzending</p>',
        '<p><b>Achteraf</b> betalen</p>',
        '<p><b>Exclusieve</b> producten</p>',
        '<p>Ook wel eens <b>gearresteerd</b></p>',
      ],
    };

    // Helper functions
    function findByFacet(code) {
      return products.find((p) => p.facetValues.find((f) => f.code === code));
    }

    function filterByFacet(code) {
      return products.filter((p) => p.facetValues.find((f) => f.code === code));
    }

    function getProductCollection(productId) {
      const collectionMap = productsPerCollection.find(({ products }) =>
        products.find((p) => p.id === productId)
      );
      if (collectionMap) {
        return allCollections.find((c) => c.id === collectionMap.collection.id);
      }
    }

    function getParentCollection(collectionId) {
      const collection = allCollections.find((c) => c.id === collectionId);
      const parent = collection.parent;
      if (parent.name !== '__root_collection__') {
        return allCollections.find((c) => c.id === parent.id);
      }
    }

    function getChildCollections(collectionId) {
      const collection = allCollections.find((c) => c.id === collectionId);
      const children = collection.children;
      const childCollections = children.map((child) =>
        allCollections.find((c) => child.id === c.id)
      );
      if (childCollections.length > 0) {
        return childCollections;
      }
    }
    function getSiblings(collectionId) {
      const parent = getParentCollection(collectionId);
      if (parent) {
        const siblings = parent.children.map((child) =>
          allCollections.find((c) => c.id === child.id)
        );
        if (siblings.length > 0) {
          return siblings;
        }
      }
    }

    // Product filtering
    const highlight1 = findByFacet('highlight1');
    const highlight2 = findByFacet('highlight2');
    const highlight3 = findByFacet('highlight3');
    const favorites = filterByFacet('favorite');

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
        products,
        highlight1,
        highlight2,
        highlight3,
        favorites,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      // Set product in breadcrumb
      let breadcrumb = { [product.name]: `/product/${product.slug}` }; // Astro cap
      const productCollection = getProductCollection(product.id);
      if (productCollection) {
        // Set direct parent collection (Fat caps)
        breadcrumb = Object.assign(
          { [productCollection.name]: `/categorie/${productCollection.slug}/` },
          breadcrumb
        );
        const parentCollection = getParentCollection(productCollection.id);
        if (parentCollection) {
          // Set collections parent (Caps)
          breadcrumb = Object.assign(
            { [parentCollection.name]: `/categorie/${parentCollection.slug}/` },
            breadcrumb
          );
          const parentsParent = getParentCollection(parentCollection.id);
          if (parentsParent) {
            // Set parents parent (Spray paint)
            breadcrumb = Object.assign(
              { [parentsParent.name]: `/categorie/${parentsParent.slug}/` },
              breadcrumb
            );
          }
        }
      }
      // Add Home before others
      breadcrumb = Object.assign({ Home }, breadcrumb);
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          ...global,
          breadcrumb,
          product,
        },
      });
    });

    // ------------------------- Category pages ----------------------
    productsPerCollection.forEach(({ products, collection }) => {
      // Create breadcrumb
      let breadcrumb = { [collection.name]: `/categorie/${collection.slug}/` };
      const parentCollection = getParentCollection(collection.id);
      if (parentCollection) {
        breadcrumb = Object.assign(
          { [parentCollection.name]: `/categorie/${parentCollection.slug}/` },
          breadcrumb
        );
        const parentsParent = getParentCollection(parentCollection.id);
        if (parentsParent) {
          breadcrumb = Object.assign(
            { [parentsParent.name]: `/categorie/${parentsParent.slug}/` },
            breadcrumb
          );
        }
      }
      breadcrumb = Object.assign({ Home }, breadcrumb);

      createPage({
        path: `/categorie/${collection.slug}`,
        component: './src/templates/Category.vue',
        context: {
          ...global,
          breadcrumb,
          collection,
          childCollections: getChildCollections(collection.id),
          siblings: getSiblings(collection.id),
          products,
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/winkelmand/',
      component: './src/templates/Cart.vue',
      context: {
        ...global,
        hideUsps: true,
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        ...global,
        availableCountries,
        hideUsps: true,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        ...global,
        hideUsps: true,
      },
    });
  });
};
