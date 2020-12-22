const gql = require('graphql-tag');

const getStockForProducts = gql`{
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
}`;

module.exports = {
    getStockForProducts
};