import { gql } from 'graphql-request';

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Vendure_Product {
    id
    name
    slug
    assets {
      preview
      thumbnail
    }
    facetValues {
      code
      name
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
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FIELDS}
  {
    Vendure {
      products {
        items {
          ...ProductFields
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  ${PRODUCT_FIELDS}
  {
    Vendure {
      collections {
        items {
          id
          name
          slug
          description
          parent {
            id
            name
            slug
          }
          children {
            id
            name
            slug
          }
          featuredAsset {
            preview
            thumbnail
          }
          productVariants {
            items {
              product {
                ...ProductFields
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_AVAILABLE_COUNTRIES = gql`
  {
    Vendure {
      availableCountries {
        name
        code
      }
    }
  }
`;
