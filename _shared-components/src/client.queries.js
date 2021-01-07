const {productFields} = require('./server.queries');

const orderFields = `
{
    id
    code
    state
    active
    totalWithTax
    subTotalWithTax
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
    shippingLines {
      shippingMethod {
        id
        code
        name
      }
    }
    lines {
      id
      quantity
      linePriceWithTax
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

const getActiveOrderQuery = `
    query activeOrder {
        activeOrder ${orderFields}
    }
`;

const eligibleShippingMethodsQuery = `
    {
        eligibleShippingMethods {
            id
            price
            priceWithTax
            name
            metadata
        }
    }`;

const setOrderShippingMethodMutation = `
    mutation setOrderShippingMethod($shippingMethodId: ID!){
        setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
            ... on Order ${orderFields}
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }`;

const adjustOrderLineMutation = `
    mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!){
        adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
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
    addItemToOrderMutation,
    getActiveOrderQuery,
    eligibleShippingMethodsQuery,
    setOrderShippingMethodMutation,
    adjustOrderLineMutation
};