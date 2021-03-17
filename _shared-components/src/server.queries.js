const productFields = `
    {
        id
        name
        slug
        assets {
            preview
            thumbnail
        }
        featuredAsset {
            id
            preview
            thumbnail
        }
        description
        variants {
            id
            name
            priceWithTax
            productId
            stockLevel
            assets {
                id
                preview
                thumbnail
            }
            featuredAsset {
                id
                preview
                thumbnail
            }
        }
    }
`;

const productsQuery = `{
    Vendure {
        products {
            items
            ${productFields}
        }
    }
}`;

const collectionsQuery = `
    {
        Vendure {
            collections {
                items {
                    id
                    name
                    slug
                    description
                    productVariants {
                        items {
                          product ${productFields}
                        }
                      }
                }
            }
        }
    }
`;

module.exports = {
  productsQuery,
  productFields,
  collectionsQuery,
};
