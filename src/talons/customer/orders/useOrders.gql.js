import { gql } from '@apollo/client';

export const OrderDetailFragment = gql`
    fragment OrderDetailFragment on CustomerOrders {
        items {
            billing_address {
                city
                company
                country_code
                fax
                firstname
                lastname
                middlename
                postcode
                prefix
                region
                region_id
                street
                suffix
                telephone
                vat_id
            }
            carrier
            comments {
                message
                timestamp
            }
            order_date
            id
            items{
                id
                discounts{
                    amount{
                    value
                    currency
                    }
                    label
                }
                entered_options{
                    label
                    value
                }
                product_name
                product_sale_price{
                    currency
                    value
                }
                product_type
                product_url_key
                selected_options{
                    label
                    value
                }
                quantity_ordered
                status
            }
            number
            order_date
            number
            payment_methods {
                name
                type
            }
            shipments {
                id
                number
                tracking{
                    carrier
                    number
                    title
                }
            }
            shipping_address {
                city
                company
                country_code
                fax
                firstname
                lastname
                middlename
                postcode
                prefix
                region
                region_id
                street
                suffix
                telephone
                vat_id
            }
            shipping_method
            state
            status
            total {
                base_grand_total{
                    value
                    currency
                }
                discounts{
                    amount{
                    value
                    currency
                    }
                    label
                }
                grand_total{
                    value
                    currency
                }
                shipping_handling{
                discounts{
                    amount{
                        value
                        currency
                    }
                    
                }
                }
                subtotal{
                    value
                    currency
                }
                total_shipping{
                    value
                    currency
                }
                total_tax{
                    value
                    currency
                }
            }
        }
        total_count
    }
`;

export const GET_ORDERS = gql`
    query getOrders{
        customer {
            orders{
                ...OrderDetailFragment
            }
        }
    }
    ${OrderDetailFragment}
`

export default {
    getOrders: GET_ORDERS,
}