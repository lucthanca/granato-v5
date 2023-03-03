import { gql } from '@apollo/client';

export const cartItemFragment = gql`
    fragment cartItemFragment on CartItemInterface{
            
            ... on ConfigurableCartItem {                
                configurable_options {
                    id
                option_label
                value_label
                value_id
                }
            }
            quantity
            product {
                name
                price_range {
                maximum_price {
                    final_price {
                    currency
                    value
                    }
                }
                }
                image {
                url
                }
                id
            }
    }
`;