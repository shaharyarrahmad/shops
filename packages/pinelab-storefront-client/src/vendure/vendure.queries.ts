import { gql } from 'graphql-request';

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
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

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
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
        thumbnail
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

export const GET_PRICE_AND_STOCKLEVEL = gql`
  {
    products {
      items {
        id
        slug
        variants {
          id
          stockLevel
          priceWithTax
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FIELDS}
  query product($slug: String) {
    product(slug: $slug) {
      ...ProductFields
    }
  }
`;

export const ADD_ITEM_TO_ORDER = gql`
  ${ORDER_FIELDS}
  mutation additemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        ...OrderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const GET_ACTIVE_ORDER = gql`
  ${ORDER_FIELDS}
  query activeOrder {
    activeOrder {
      ...OrderFields
    }
  }
`;

export const GET_ELIGIBLESHIPPINGMETHODS = gql`
  {
    eligibleShippingMethods {
      id
      price
      priceWithTax
      name
      metadata
    }
  }
`;

export const SET_ORDERSHIPPINGMETHOD = gql`
  ${ORDER_FIELDS}
  mutation setOrderShippingMethod($shippingMethodId: ID!) {
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ... on Order {
        ...OrderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const ADJUST_ORDERLINE = gql`
  ${ORDER_FIELDS}
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ... on Order {
        ...OrderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const SET_CUSTOMER_FOR_ORDER = gql`
  ${ORDER_FIELDS}
  mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ... on Order {
        ...OrderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const SET_ORDERSHIPPINGADDRESS = gql`
  ${ORDER_FIELDS}
  mutation setOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ... on Order {
        ...OrderFields
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;

export const GET_NEXT_ORDERSTATES = gql`
  {
    nextOrderStates
  }
`;

export const TRANSITION_ORDER_TO_STATE = gql`
  ${ORDER_FIELDS}
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      ... on Order {
        ...OrderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const ADD_PAYMENT_TO_ORDER = gql`
  ${ORDER_FIELDS}
  mutation addPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ... on Order {
        ...OrderFields
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const GET_ORDER_BY_CODE = gql`
  ${ORDER_FIELDS}
  query orderByCode($code: String!) {
    orderByCode(code: $code) {
      ...OrderFields
    }
  }
`;
