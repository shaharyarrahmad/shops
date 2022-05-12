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
      facet {
        code
        name
      }
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

export const GET_PRODUCTS = gql`
  ${PRODUCT_FIELDS}
  query products($options: Vendure_ProductListOptions) {
    Vendure {
      products(options: $options) {
        totalItems
        items {
          ...ProductFields
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
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
                id
                name
                slug
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
