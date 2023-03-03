import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SIGN_OUT } from './signOut.gql'

export const signOut = (props) => {
  const [revokeToken, { loading: revokeTokenLoading, error, data }] = useMutation(SIGN_OUT);
  
  return {
    revokeTokenLoading,
    data: data,
    revokeToken
  };
};
