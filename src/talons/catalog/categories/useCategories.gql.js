import { gql } from '@apollo/client';
import { ProductDetailsFragment } from '../product/productDetailFragment.gql';

// export const CategoryTreeFragment = gql`
//     fragment CategoryTreeFragment on CategoryTree {
//         children {
//             available_sort_by
//             canonical_url
//             children_count
//             id
//             uid
//             image
//             include_in_menu
//             is_anchor
//             landing_page
//             level
//             meta_description
//             meta_keywords
//             meta_title
//             name
//             path
//             path_in_store
//             position
//             products(pageSize: 6, currentPage: 1, sort: {}){
//                 items{
//                     name    
//                     uid      
//                 }        
//             }
//             children{
//                 available_sort_by
//                 canonical_url
//                 children_count
//                 id
//                 uid
//                 image
//                 include_in_menu
//                 is_anchor
//                 landing_page
//                 level
//                 meta_description
//                 meta_keywords
//                 meta_title
//                 name
//                 path
//                 path_in_store
//                 position
//                 products(pageSize: 20, currentPage: 1, sort: {}){
//                     items{
//                         name 
//                         uid             
//                     }        
//                 }
//             }
//         }
//     }
// `
export const GET_CATEOGRY_ROOT = gql`
    query  getCategoryRoot{
        categoryList(filters: { name: { match: "Default Category" } }) {
            uid
            image
            include_in_menu
            is_anchor
            landing_page
            id
            level
            meta_description
            meta_keywords
            meta_title
            name
            children{
                available_sort_by
                canonical_url
                children_count
                id
                uid
                image
                include_in_menu
                is_anchor
                landing_page
                level
                meta_description
                meta_keywords
                meta_title
                name
                path
                path_in_store
                position                
            }
        }
    }
`;

export const GET_CATEOGRY = gql`
    query  getCategory($categoryId: String!){
        categoryList(filters: { parent_id : { eq: $categoryId } }) {
            uid
            image
            include_in_menu
            id
            is_anchor
            landing_page
            level
            meta_description
            meta_keywords
            meta_title
            name
            children{
                available_sort_by
                canonical_url
                children_count
                id
                uid
                image
                include_in_menu
                is_anchor
                landing_page
                level
                meta_description
                meta_keywords
                meta_title
                name
                path
                path_in_store
                position                
            }
            products(pageSize: 6, currentPage: 1, sort: {}){
                items{
                    name 
                    id
                    uid      
                    url_key
                    image { url}       
                }        
            }
        }
        products(
            filter: {
                category_id: {
                    eq: $categoryId
                }
            }
            pageSize: 6
            currentPage: 1
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

// export const CategoryTreeFragment = gql`
//     fragment CategoryTreeFragment on CategoryTree {
//         children {
//             available_sort_by
//             canonical_url
//             children_count
//             id
//             image
//             include_in_menu
//             is_anchor
//             landing_page
//             level
//             meta_description
//             meta_keywords
//             meta_title
//             name
//             path
//             path_in_store
//             position
//             product_count
//             products(pageSize: 6, currentPage: 1, sort: {}) {
//                 items{
//                     ...ProductDetailsFragment
//                 }
//                 total_count
//             }
//         }
//     }
//     ${ProductDetailsFragment}
// `

export default {
    getCategoryRoot: GET_CATEOGRY_ROOT
}