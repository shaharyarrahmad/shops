const {PageGenerator} = require('pinelab-storefront-client');

module.exports = async function (api) {

  const generator = new PageGenerator({
    home: {
      slug: '/',
      template: 'src/templates/Products.vue'
    }
  })

  api.createPages(async ({ createPage, graphql }) => {
    await generator.createPages({ createPage, graphql });
  });
};
