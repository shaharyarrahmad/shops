const gql = require('graphql-tag');

const productFields = gql`
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

const productsQuery = gql`{
    Vendure {
        products {
            items
            ${productFields}
        }
    }
}`;

const collectionsQuery = gql`
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