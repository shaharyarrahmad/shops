import {gql} from 'graphql-request';

export const GET_PRODUCTS = gql`
    {
        Vendure {
            products {
                items {
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
                }
            }
        }
    }
`