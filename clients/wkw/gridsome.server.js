const {
  VendureServer,
  SearchUtil,
  deduplicate,
} = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');
const { mapToMinimalCollection } = require('./util');
const { GET_CONTENT } = require('./content.queries');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureNL = new VendureServer(
      `${process.env.GRIDSOME_VENDURE_API}?languageCode=nl`,
      process.env.GRIDSOME_VENDURE_TOKEN
    );

    const vendureEN = new VendureServer(
      `${process.env.GRIDSOME_VENDURE_API}?languageCode=en`,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const directus = new GraphQLClient(
      `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
    );

    let {
      products: allProductsNL,
      availableCountries,
      collections: allCollectionsNL,
      productsPerCollectionNL,
    } = await vendureNL.getShopData();

    let {
      products: allProductsEN,
      collections: allCollectionsEN,
      productsPerCollectionEN,
    } = await vendureNL.getShopData();

    const {
      data: {
        Directus: {
          wkw_home: home,
          wkw_algemeen: common,
          wkw_paginas: pages,
          wkw_blogs: blogs,
        },
      },
    } = await directus.request(GET_CONTENT);

    const pages_nl = pages.filter((p) => p.language === 'nl');
    const pages_en = pages.filter((p) => p.language === 'en');

    const blogs_nl = blogs.filter((b) => b.language === 'nl');
    const blogs_en = blogs.filter((b) => b.language === 'en');

    const languages = [
      {
        lang: 'nl',
        products: allProductsNL,
        collections: allCollectionsNL,
        slugPrefix: '',
        domain: 'https://wormenkwekerijwasse.nl',
        categoryPrefix: 'product-categorie',
        productPrefix: 'product',
        pages: pages_nl,
        blogs: blogs_nl,
      },
      {
        lang: 'en',
        products: products_en,
        collections: collections_en,
        slugPrefix: '/en',
        domain: 'https://wormenkwekerijwasse.nl',
        categoryPrefix: 'product-category',
        productPrefix: 'product',
        pages: pages_en,
        blogs: blogs_en,
      },
    ];

    // Set absolute path for product.url and collection.url: product.url = '/product/lavameel/'
    const categoryPrefix = 'product-categorie';
    const productPrefix = 'product';

    // FIXME do in language loop
    const collections = allCollectionsNL;
    const collections = allCollectionsNL;

    allCollectionsNL.forEach(
      (colllection) =>
        (colllection.url = `/${categoryPrefix}/${colllection.slug}/`)
    );
    allProductsNL = allProductsNL.map(
      (product) => (product.url = `/${productPrefix}/${product.slug}/`)
    );
    productsPerCollectionNL.forEach((collectionMap) => {
      collectionMap.products.forEach(
        (product) => (product.url = `/${productPrefix}/${product.slug}/`)
      );
    });

    const collections = vendureNL.unflatten(allCollectionsNL);
    const navbarCollections = collections.map(mapToMinimalCollection);

    const global = {
      navbarCollections,
    };

    // -------------------- Home -----------------------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
      },
    });

    // -------------------- ProductDetail -----------------------------------
    allProductsNL.forEach((product) => {
      createPage({
        path: product.url,
        component: './src/templates/ProductDetail.vue',
        context: {
          ...global,
          product,
        },
      });
    });
  });
};
