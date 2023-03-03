import { gql } from '@apollo/client';

export const RelatedProductFragment = gql`
  fragment RelatedProductFragment on ProductInterface {
    __typename
    name
    sku
    url_key
    price_range {
      maximum_price {
        final_price {
          value
          currency
        }
        regular_price {
          value
          currency
        }
      }
      minimum_price {
        final_price {
          value
          currency
        }
        regular_price {
          value
          currency
        }
      }
    }
    small_image {
      url
    }
  }
`;
