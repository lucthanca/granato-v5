import { gql } from '@apollo/client';
import { ProductDetailsFragment } from '../product/productDetailFragment.gql';
export const GET_PRODUCTS = gql`
  query  getProducts($filter: ProductAttributeFilterInput!, $pageSize: Int!, $currentPage: Int!){ 
    products(
      filter: $filter      
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      aggregations {
        attribute_code
        count
        options{
          label
          count
          value
        }
        label
      }
      items {
        id
        uid
        ...ProductDetailsFragment
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      sort_fields {
        default
        options{
          label
          value
        }
      }
      total_count
  }
}
${ProductDetailsFragment}
`;
