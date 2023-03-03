import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
mutation createCustomer($email: String!, $password: String!, $firstname: String!, $lastname: String!) {
    createCustomer(input: {email: $email, password: $password, firstname: $firstname, lastname: $lastname}) {
        customer {
            email
            firstname
            lastname
        }
}
}
`;
