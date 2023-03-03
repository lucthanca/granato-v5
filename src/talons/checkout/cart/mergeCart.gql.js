import { gql } from '@apollo/client';

export const MERGE_CARTS = gql`
mutation mergeCarts($source_cart_id: String!, $destination_cart_id: String!) {
    mergeCarts(source_cart_id: $source_cart_id, destination_cart_id: $destination_cart_id) {
        email
        id
    }
}
`;




