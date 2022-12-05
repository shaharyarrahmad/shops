import { VendureServerSideClient } from './vendure-server-side.client';
import { gql } from 'graphql-request';

const additionalCollectionFields = gql`
  fragment AdditionalCollectionFields on Collection {
    id
  }
`;

const additionalProductFields = gql`
  fragment AdditionalProductFields on Product {
    assets {
      thumbnail
    }
    featuredAsset {
      thumbnail
    }
    variants {
      assets {
        thumbnail
      }
      featuredAsset {
        thumbnail
      }
    }
    customFields {
      metaTitle
      metaDescription
      keywords
    }
  }
`;

const additionalOrderFields = gql`
  fragment AdditionalOrderFields on Order {
    id
  }
`;

/**
 * A Vendure client tailored to fetch all fields from the Pinelab Shops Vendure instance.
 * For generic projects use VendureClient or VendureServerSideClient
 */
export class ShopServerSideClient extends VendureServerSideClient {
  constructor(url: string, channelToken: string) {
    super(url, channelToken, {
      additionalCollectionFields,
      additionalProductFields,
    });
  }
}
