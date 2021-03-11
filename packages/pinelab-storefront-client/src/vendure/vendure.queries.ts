import {gql} from 'graphql-request';

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

export const GET_ACTIVE_ORDER = gql`
    ${ORDER_FIELDS}
    query activeOrder {
        activeOrder {
            ...OrderFields
        }
    }
`;

export const GET_PRODUCT_STOCK = gql`
    {
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