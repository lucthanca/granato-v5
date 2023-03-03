import { gql } from '@apollo/client';
// import { ProductDetailsFragment } from '../../catalog/product/productDetailFragment.gql';

export const GET_CUSTOMER = gql`
    query GetCustomerAfterSignIn {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            email
            firstname
            lastname
        }
    }

`;

export const UPDATE_CUSTOMER = gql`
    mutation updateCustomer($firstname: String!, $lastname: String!) {
        updateCustomer(input: {firstname: $firstname, lastname: $lastname}) {
            customer {
                email
                firstname
                lastname
            }
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            email
            firstname
            lastname
        }
    }
`;