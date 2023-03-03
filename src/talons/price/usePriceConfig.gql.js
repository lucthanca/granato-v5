import { gql } from '@apollo/client';

export const GET_PRICE_CONFIG = gql`
  query getPriceDisplayConfig {
    storeConfig {
      store_code
      tax_display_in_catalog
    }
  }
`;
