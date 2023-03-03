import { gql } from '@apollo/client';

export const PriceRangeFragment = gql`
  fragment PriceRangeFragment on ProductInterface {
    price_range {
      maximum_price {
        final_price {
          currency
          value
        }
        regular_price {
          currency
          value
        }
        final_price_excl_tax {
          currency
          value
        }
      }
      minimum_price {
        final_price {
          currency
          value
        }
        regular_price {
          currency
          value
        }
        final_price_excl_tax {
          currency
          value
        }
      }
    }
  }
`;
