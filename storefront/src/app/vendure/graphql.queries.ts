import {gql} from 'graphql-request';

export const productFields = `
   id
   name
   assets {
     preview
   }
   description
   variants {
     id
     name
     priceWithTax
     productId
   }
`;

export const productsQuery = gql`
  {
    products {
      items {
        ${productFields}
      }
    }
  }`;

export const productQuery = gql`
  query product($id: ID) {
    product(id: $id) {
      ${productFields}
    }
  }`;

export const orderFields = gql`
    id
    code
    state
    active
    total
    subTotal
    shipping
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
    }
    lines {
      id
      quantity
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
`;

export const activeOrderQuery = gql`{
  activeOrder {
    ${orderFields}
  }
}`;

export const addItemToOrderMutation = gql`
  mutation additemToOrder($productVariantId: ID!, $quantity: Int!){
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity ) {
      ${orderFields}
    }
  }`;

export const adjustOrderLineMutation = gql`
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int){
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ${orderFields}
    }
  }`;

export const setCustomerForOrderMutation = gql`
  mutation setCustomerForOrder($input: CreateCustomerInput!){
    setCustomerForOrder(input: $input) {
      ${orderFields}
    }
  }`;

export const setOrderShippingAddressMutation = gql`
  mutation setOrderShippingAddress($input: CreateAddressInput!){
    setOrderShippingAddress(input: $input) {
      ${orderFields}
    }
  }`;

export const setOrderShippingMethodMutation = gql`
  mutation setOrderShippingMethod($shippingMethodId: ID!){
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ${orderFields}
    }
  }`;

export const transitionOrderToStateMutation = gql`
  mutation transitionOrderToState($state: String!){
    transitionOrderToState(state: $state) {
      ${orderFields}
    }
  }`;

export const addPaymentToOrderMutation = gql`
  mutation addPaymentToOrder($input: PaymentInput!){
    addPaymentToOrder(input: $input) {
      ${orderFields}
    }
  }`;

export const eligibleShippingMethodsQuery = gql`
  {
    eligibleShippingMethods {
      id
      price
      priceWithTax
      description
      metadata
    }
  }`;

export const nextOrderStatesQuery = gql`
  {
    nextOrderStates
  }`;
