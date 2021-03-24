const { PageGenerator } = require('pinelab-storefront-client');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const generator = new PageGenerator({
      graphqlFn: graphql,
      createPageFn: createPage,
    });

    await generator.createStaticPages({
      home: {
        slug: '/',
        template: 'src/templates/ProductsTemplate.vue',
      },
      productDetail: {
        slugPrefix: '/product/',
        template: 'src/templates/ProductTemplate.vue',
      },
      collectionDetail: {
        slugPrefix: '/',
        template: 'src/templates/ProductsTemplate.vue',
      },
    });
  });
};
