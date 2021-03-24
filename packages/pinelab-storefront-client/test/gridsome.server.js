const { PageGenerator } = require('pinelab-storefront-client');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const generator = new PageGenerator({
      graphqlFn: graphql,
      createPageFn: createPage
    });

    await generator.createStaticPages({
      home: {
        slug: '/',
        template: 'src/templates/ProductOverview.vue',
      },
      productDetail: {
        slug: '/product/',
        template: 'src/templates/Product.vue',
      },
      collection: {
        slug: '/',
        template: 'src/templates/ProductOverview.vue',
      },
    });
  });
};
