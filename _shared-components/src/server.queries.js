const productFields = `
    {
        id
        name
        slug
        assets {
            preview
        }
        featuredAsset {
            id
            preview
        }
        description
        variants {
            id
            name
            priceWithTax
            productId
            available
            assets {
                id
                preview
            }
            featuredAsset {
                id
                preview
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
                }
            }
        }
    }
`;

module.exports = {
    productsQuery,
    productFields,
    collectionsQuery
};