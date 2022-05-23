const { setCalculatedFields } = require('pinelab-storefront-client');
module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    let {
      data: {
        Vendure: {
          products: { items: products },
        },
      },
    } = await graphql(`
      query products {
        Vendure {
          products {
            totalItems
            items {
              id
              name
              slug
              assets {
                preview
                thumbnail
                source
              }
              facetValues {
                code
                name
                facet {
                  code
                  name
                }
              }
              featuredAsset {
                id
                preview
                thumbnail
                source
              }
              variants {
                id
                name
                priceWithTax
                productId
              }
              description
              customFields {
                metaTitle
                metaDescription
                keywords
              }
            }
          }
        }
      }
    `);

    products = products.map(p => setCalculatedFields(p));

    console.log(JSON.stringify(products));

    const global = {
      email: 'info@ophetboek.nl',
      instagram: 'https://www.instagram.com/tipvanjet/',
      facebook: 'https://www.facebook.com/jetvnieuwkerk/',
    };

    if (!products || !products.length) {
      throw Error(`No products found!`);
    }

    products[0].assets = products[0].assets.filter(
      (asset) => asset.preview !== products[0].featuredAsset.preview
    );

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        product: products[0],
        global,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        product: products[0],
        global,
      },
    });

    createPage({
      path: '/under-construction/',
      component: './src/templates/UnderConstruction.vue',
    });
  });
};
