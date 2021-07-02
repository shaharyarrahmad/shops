const { GridsomeService } = require('pinelab-storefront-client');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer/lib/BundleAnalyzerPlugin');

module.exports = async function (api) {
  console.log(`\x1b[46mUsing API ${process.env.GRIDSOME_VENDURE_API}\x1b[0m`);
  api.afterBuild(({ redirects }) => {
    console.log('------ Create the following redirects in static/_redirects!');
    for (const rule of redirects) {
      console.log(`${rule.from} ${rule.to}`);
      // rule.from   - The dynamic path
      // rule.to     - The HTML file path
      // rule.status - 200 if rewrite rule
    }
  });

  /*    api.chainWebpack(config => {
            config
                .plugin('BundleAnalyzerPlugin')
                .use(BundleAnalyzerPlugin, [{analyzerMode: 'static'}])
        })*/

  api.createPages(async ({ createPage, graphql }) => {
    const gridsome = new GridsomeService(graphql);
    const data = await gridsome.getShopData();

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/ProductsTemplate.vue',
      context: {
        products: data.products?.reverse(),
        collections: data.collections,
      },
    });

    // ----------------- ProductDetail ---------------------
    data.products.forEach((product) => {
      createPage({
        path: `/product/${product.slug}/`,
        component: './src/templates/ProductTemplate.vue',
        context: {
          product,
          previousPage: '/',
        },
      });
    });

    // ----------------- Collection pages ---------------------
    data.productsPerCollection.forEach((collectionMap) => {
      createPage({
        path: `/${collectionMap.collection.slug}/`,
        component: './src/templates/ProductsTemplate.vue',
        context: {
          products: collectionMap.products,
          collection: collectionMap.collection,
          previousPage: '/',
        },
      });
    });
  });
};
