import gql from 'graphql-tag';

export const ORDER_FRAGMENT = gql`
  fragment OrderFields on Order {
    id
    code
    state
    active
    total
    totalWithTax
    lines {
      id
      quantity
      productVariant {
        id
      }
      discounts {
        adjustmentSource
        amount
        description
        type
      }
    }
    discounts {
      adjustmentSource
      amount
      description
      type
    }
  }
`;

export const GET_CUSTOMER_LIST = gql`
  query GetCustomerList($options: CustomerListOptions) {
    customers(options: $options) {
      items {
        id
        title
        firstName
        lastName
        emailAddress
        phoneNumber
        user {
          id
          verified
        }
      }
      totalItems
    }
  }
`;

export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderFields
      ... on ErrorResult {
        errorCode
        message
      }
      ... on InsufficientStockError {
        quantityAvailable
        order {
          ...OrderFields
        }
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($id: ID!) {
    setOrderShippingMethod(shippingMethodId: $id) {
      ...OrderFields
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

export const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ... on Order {
        shippingAddress {
          fullName
          company
          streetLine1
          streetLine2
          city
          province
          postalCode
          country
          phoneNumber
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = gql`
  query GetShippingMethods {
    eligibleShippingMethods {
      id
      price
      name
      description
    }
  }
`;

export const TRANSITION_TO_STATE = gql`
  mutation TransitionToState($state: String!) {
    transitionOrderToState(state: $state) {
      ...OrderFields
      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
        fromState
        toState
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

export const GET_ORDER = gql`
  ${ORDER_FRAGMENT}
  query GetOrder($id: ID!) {
    order(id: $id) {
      ...OrderFields
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation AddPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ...OrderFields
      ... on ErrorResult {
        errorCode
        message
      }
      ... on PaymentDeclinedError {
        paymentErrorMessage
      }
      ... on PaymentFailedError {
        paymentErrorMessage
      }
      ... on OrderStateTransitionError {
        transitionError
      }
    }
  }
  ${ORDER_FRAGMENT}
`;
