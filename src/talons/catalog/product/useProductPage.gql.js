import { gql } from '@apollo/client';
import { ProductDetailsFragment } from './productDetailFragment.gql';
import { GroupedProductDetailsFragment } from './groupedProductFragment';

export const GET_PRODUCT_DETAIL_QUERY = gql`
  query getProductDetailForProductPage($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        id
        uid
        ...ProductDetailsFragment
        ...GroupedProductDetailsFragment
      }
    }
  }
  ${ProductDetailsFragment}
  ${GroupedProductDetailsFragment}
`;
export default {
  getProductDetailsQuery: GET_PRODUCT_DETAIL_QUERY,
};
