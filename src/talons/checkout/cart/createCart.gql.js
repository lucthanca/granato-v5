import { gql } from '@apollo/client'

export const CREATE_EMPTY_CART_GUEST = gql`
mutation createEmptyCartForGuest {
  cartId: createEmptyCart 
}
`;