const { VendureServer } = require('pinelab-storefront');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    let { products, availableCountries, collections, productsPerCollection } =
      await vendureServer.getShopData();
      collections = vendureServer.unflatten(collections);

    const highlight1 = products.find(p => {
      return p.facetValues.find(f => f.code === 'highlights-1')
    })

    const highlight2 = products.find(p => {
      return p.facetValues.find(f => f.code === 'highlights-2')
    })

    const highlight3 = products.find(p => {
      return p.facetValues.find(f => f.code === 'highlights-3')
    })

    products.forEach(p => {
      p.shortDescription = p.description.substring(0, 75) + "...";
    })

    products.forEach(p => {
      p.mediumDescription = p.description.substring(0, 150) + "...";
    })

    products.forEach(p => {
      p.largeDescription = p.description.substring(0, 225) + "...";
    })




    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products, 
        highlight1, highlight2, highlight3,
        topproducts: products.slice(0,5),
        categories: collections,
      },
    });
  });
};
