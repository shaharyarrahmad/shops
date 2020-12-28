const getStockForProducts = `{
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