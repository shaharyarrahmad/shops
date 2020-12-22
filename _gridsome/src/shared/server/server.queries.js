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

const getProducts = gql`{
    Vendure {
        products {
            items
            ${productFields}
        }
    }
}`;

const getStockForProducts = gql`{
    Vendure {
        products {
            items {
                slug
                variants {
                    id
                    available
                    priceWithTax
                }
            }
        }
    }
}`;

module.exports = {
    getProducts,
    productFields
};