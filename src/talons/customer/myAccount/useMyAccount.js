import { GET_CUSTOMER, UPDATE_CUSTOMER, CHANGE_PASSWORD } from './useMyAccount.gql';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';

export const useMyAccount = () => {
  const [fetchUserDetails] = useLazyQuery(GET_CUSTOMER);
  const [updateInfo] = useMutation(UPDATE_CUSTOMER);
  const [changePassword, { data, loading, error }] = useMutation(CHANGE_PASSWORD);

  useEffect(() => {
    if (error) {
      // console.log("updateInfo Error: ", error);
    }
  }, [error]);

  return {
    ChangePassError: error,
    fetchUserDetails,
    updateInfo,
    changePassword,
  };
};
