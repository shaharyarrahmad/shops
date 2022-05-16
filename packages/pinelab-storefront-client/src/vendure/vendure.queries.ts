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
      options {
        id
        name
        group {
          id
          name
        }
      }
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
    customFields {
      metaTitle
      metaDescription
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
    taxSummary {
      taxRate
      taxTotal
      taxBase
    }
    payments {
      id
      state
      errorMessage
      metadata
    }
    discounts {
      description
      amountWithTax
    }
    couponCodes
  }
`;

export const GET_PRICE_AND_STOCKLEVEL = gql`
  query products {
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
  query eligibleShippingMethods {
    eligibleShippingMethods {
      id
      price
      priceWithTax
      name
      description
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
  query nextOrderStates {
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

export const CREATE_MOLLIE_PAYMENT_INTENT = gql`
  mutation createMolliePaymentIntent($input: MolliePaymentIntentInput!) {
    createMolliePaymentIntent(input: $input) {
      ... on MolliePaymentIntent {
        url
      }
      ... on MolliePaymentIntentError {
        errorCode
        message
      }
    }
  }
`;

export const CREATE_COINBASE_PAYMENT_INTENT = gql`
  mutation createCoinbasePaymentIntent {
    createCoinbasePaymentIntent
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

export const GET_DUTCH_ADDRESS = gql`
  query dutchAddressLookup($input: DutchPostalCodeInput!) {
    dutchAddressLookup(input: $input) {
      street
      city
    }
  }
`;

export const APPLY_COUPON_CODE = gql`
  ${ORDER_FIELDS}
  mutation applyCouponCode($couponCode: String!) {
    applyCouponCode(couponCode: $couponCode) {
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

export const REMOVE_ALL_ORDER_LINES = gql`
  ${ORDER_FIELDS}
  mutation removeAllOrderLines {
    removeAllOrderLines {
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

export const REMOVE_COUPON_CODE = gql`
  ${ORDER_FIELDS}
  mutation removeCouponCode($couponCode: String!) {
    removeCouponCode(couponCode: $couponCode) {
      ... on Order {
        ...OrderFields
      }
    }
  }
`;

export const GET_DROP_OFF_POINTS = gql`
  query myparcelDropOffPoints($input: MyparcelDropOffPointInput!) {
    myparcelDropOffPoints(input: $input) {
      location_code
      location_name
      city
      postal_code
      street
      number
      number_suffix
      phone
      reference
      available_days
      cut_off_time
      distance
      carrier_id
    }
  }
`;

export const SET_PICKUP_LOCATION_FOR_ORDER = gql`
  ${ORDER_FIELDS}
  mutation setOrderCustomFields($customFields: UpdateOrderCustomFieldsInput) {
    setOrderCustomFields(input: { customFields: $customFields }) {
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
