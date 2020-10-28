import {gql} from 'graphql-request';

export const productFields = gql`
  fragment productFields on Product {
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
      featuredAsset {
        id
        preview
      }
    }
  }
`;

export const productsQuery = gql`
  ${productFields}
  {
    products {
      items {
        ...productFields
      }
    }
  }`;

export const productQuery = gql`
  ${productFields}
  query product($id: ID) {
    product(id: $id) {
      ...productFields
    }
  }`;

export const orderFields = gql`
  fragment orderFields on Order {
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

export const activeOrderQuery = gql`
  ${orderFields}
  query activeOrder {
    activeOrder {
      ...orderFields
    }
  }
`;

export const orderByCodeQuery = gql`
  ${orderFields}
  query orderByCode($code: String!){
    orderByCode(code: $code) {
      ...orderFields
    }
  }`;

export const addItemToOrderMutation = gql`
  ${orderFields}
  mutation additemToOrder($productVariantId: ID!, $quantity: Int!){
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity ) {
      ... on Order {
        ...orderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }`;

export const adjustOrderLineMutation = gql`
  ${orderFields}
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int){
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ... on Order {
        ...orderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }`;

export const setCustomerForOrderMutation = gql`
  ${orderFields}
  mutation setCustomerForOrder($input: CreateCustomerInput!){
    setCustomerForOrder(input: $input) {
      ... on Order {
        ...orderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }`;

export const setOrderShippingAddressMutation = gql`
  ${orderFields}
  mutation setOrderShippingAddress($input: CreateAddressInput!){
    setOrderShippingAddress(input: $input) {
      ...orderFields
    }
  }`;

export const setOrderShippingMethodMutation = gql`
  ${orderFields}
  mutation setOrderShippingMethod($shippingMethodId: ID!){
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ... on Order {
        ...orderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }`;

export const transitionOrderToStateMutation = gql`
  ${orderFields}
  mutation transitionOrderToState($state: String!){
    transitionOrderToState(state: $state) {
      ... on Order {
        ...orderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }`;

export const addPaymentToOrderMutation = gql`
  ${orderFields}
  mutation addPaymentToOrder($input: PaymentInput!){
    addPaymentToOrder(input: $input) {
      ... on Order {
        ...orderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
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
