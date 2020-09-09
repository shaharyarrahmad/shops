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

export const orderFields = `
      id
      state
      total
      lines {
        quantity
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
