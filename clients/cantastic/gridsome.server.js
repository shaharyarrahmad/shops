const { setSwatchColors } = require('./util');
const fs = require('fs');
const Fuse = require('fuse.js');
const { GET_CONTENT } = require('./content.queries');
const { VendureServer, SearchUtil } = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');

module.exports = async function (api) {
  // Breadcrumb pages
  const Home = '/';

  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const directus = new GraphQLClient(
      `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
    );
    const [
      {
        // Vendure content
        products: allProducts,
        availableCountries,
        collections: allCollections,
        productsPerCollection,
      },
      {
        // Directus content
        cantastic_blogs: blogs,
        cantastic_algemeen: { over_cantastic: shortAbout },
      },
    ] = await Promise.all([
      vendureServer.getShopData(),
      directus.request(GET_CONTENT),
    ]);

    // Set category field on products
    const products = allProducts.map((p) => {
      const facetValue = p.facetValues.find(
        (facetValue) => facetValue.facet.code === 'category-3'
      );
      p.category = facetValue ? facetValue.name : undefined;
      return p;
    });

    const highlight1 = allCollections.find((col) => col.slug === 'highlight1');
    const highlight2 = allCollections.find((col) => col.slug === 'highlight2');
    const highlight3 = allCollections.find((col) => col.slug === 'highlight3');
    const collections = vendureServer.unflatten(allCollections);
    const navbarCollections = collections.filter(
      (col) => col.name !== 'highlights'
    );
    const global = {
      favorites: products.filter((p) =>
        p.facetValues.find((f) => f.code === 'favorite')
      ),
      collections: navbarCollections,
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
    function getProductCollection(productId) {
      const collectionMap = productsPerCollection.find(({ products }) =>
        products.find((p) => p.id === productId)
      );
      if (collectionMap) {
        return allCollections.find((c) => c.id === collectionMap.collection.id);
      }
    }

    function getProductCollections(productId) {
      const collectionMap = productsPerCollection.find(({ products }) =>
        products.find((p) => p.id === productId)
      );
      if (collectionMap) {
        return allCollections.filter(
          (c) => c.id === collectionMap.collection.id
        );
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

    // ----------------- Search ---------------------
    const searchProducts = products.map((p) => ({
      ...p,
      collections: getProductCollections(p.id) || [],
    }));
    const searchUtil = new SearchUtil(Fuse);
    const indexObject = searchUtil.createSearchIndex(searchProducts, [
      {
        name: 'keywords',
        weight: 3,
      },
      {
        name: 'name',
        weight: 2,
      },
      {
        name: 'collections',
        weight: 1,
      },
    ]);
    fs.writeFileSync('./static/_search.json', JSON.stringify(indexObject));

    // ----------------- Index ---------------------
    console.log(highlight1);
    console.log(highlight2);
    console.log(highlight3);
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
        products,
        highlight1,
        highlight2,
        highlight3,
        shortAbout,
        blogs: blogs.slice(0, 3),
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
      let component = 'Product.vue';
      const swatchFacet = product.facetValues.find(
        (f) => f.code.indexOf('swatch') > -1
      );
      if (swatchFacet) {
        component = 'ColorSwatchProduct.vue';
        setSwatchColors(product, swatchFacet.code, '#000000');
      }

      // Add Home before others
      breadcrumb = Object.assign({ Home }, breadcrumb);
      createPage({
        path: `/product/${product.slug}`,
        component: `./src/templates/${component}`,
        context: {
          ...global,
          breadcrumb,
          product,
          colorChart: swatchFacet ? swatchFacet.code : undefined,
        },
      });
    });

    // ------------------------- Category pages ----------------------
    productsPerCollection.forEach(({ products, collection }) => {
      // Create breadcrumb
      let breadcrumb = { [collection.name]: `/categorie/${collection.slug}/` };
      const parentCollection = getParentCollection(collection.id);
      let collectionLevel = 1;
      if (parentCollection) {
        // Level 1 collections don't have parents
        collectionLevel = 2;
        breadcrumb = Object.assign(
          { [parentCollection.name]: `/categorie/${parentCollection.slug}/` },
          breadcrumb
        );
        const parentsParent = getParentCollection(parentCollection.id);
        if (parentsParent) {
          collectionLevel = 3;
          breadcrumb = Object.assign(
            { [parentsParent.name]: `/categorie/${parentsParent.slug}/` },
            breadcrumb
          );
        }
      }
      breadcrumb = Object.assign({ Home }, breadcrumb);
      const childCollections = getChildCollections(collection.id);
      let template = 'Category.vue';
      if (collectionLevel > 1) {
        template = 'ProductListing.vue';
      }
      if (collectionLevel === 2) {
        // get products of childCollections
        for (const childCollection of childCollections || []) {
          products.push(
            ...productsPerCollection.find(
              (ppc) => ppc.collection.id === childCollection.id
            )?.products
          );
        }
      }
      createPage({
        path: `/categorie/${collection.slug}`,
        component: `./src/templates/${template}`,
        context: {
          ...global,
          breadcrumb,
          collection,
          childCollections,
          siblings: getSiblings(collection.id),
          products,
        },
      });
    });

    // ------------------Blog Listing ----------
    createPage({
      path: `/blog/`,
      component: './src/templates/BlogListing.vue',
      context: {
        ...global,
        blogs,
        breadcrumb: {
          Home: '/',
          Blog: '/blog/',
        },
      },
    });

    // ----------------- Blog ------------
    blogs.forEach((blog) => {
      createPage({
        path: `/blog/${blog.slug}`,
        component: './src/templates/Blog.vue',
        context: {
          ...global,
          blog,
          relatedBlogs: blogs.slice(0, 3),
          breadcrumb: {
            Home: '/',
            Blog: '/blog/',
            [blog.title]: blog.slug,
          },
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/winkelmand/',
      component: './src/templates/Cart.vue',
      context: {
        ...global,
        hideUsps: false,
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
      component: './src/templates/OrderConfirmation.vue',
      context: {
        ...global,
        hideUsps: true,
      },
    });

    // ----------------- 404 ------------
    createPage({
      path: '/404/',
      component: './src/templates/404.vue',
      context: {
        ...global,
        hideUsps: true,
      },
    });
  });
};
