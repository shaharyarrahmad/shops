module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    // -------------------- Home -----------------------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {},
    });
  });
};
