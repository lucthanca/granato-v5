import { gql } from '@apollo/client'

export const GET_CART_ID = gql`
query getCartID{
    customerCart{
      id
    }
  }
`;