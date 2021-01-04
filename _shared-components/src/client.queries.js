const {productFields} = require('./server.queries');

const orderFields = `
{
    id
    code
    state
    active
    total
    subTotal
    shippingWithTax
    customer {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
    }
    shippingAddress {
      company
      streetLine1
      streetLine2
      city
      postalCode
      country
    }
    shippingMethod {
      id
      code
      name
    }
    lines {
      id
      quantity
      totalPrice
      featuredAsset {
        id
        preview
      }
      productVariant {
        id
        sku
        name
        priceWithTax
        product {
          id
          name
        }
      }
    }
    payments {
      id
      state
      errorMessage
      metadata
    }
  }
`;

const getStockForProductsQuery = `{
    products {
        items {
            id
            slug
            variants {
                id
                available
                priceWithTax
            }
        }
    }
}`;

const getProductQuery = `
    query product($slug: String) {
        product(slug: $slug) ${productFields}
    }`;

const addItemToOrderMutation = `
    mutation additemToOrder($productVariantId: ID!, $quantity: Int!){
        addItemToOrder(productVariantId: $productVariantId, quantity: $quantity ) {
            ... on Order ${orderFields}
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }`;

module.exports = {
    getStockForProductsQuery,
    getProductQuery,
    addItemToOrderMutation
};