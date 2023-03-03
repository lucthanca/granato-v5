import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import AppStorage from '@helper/storage';
import { CREATE_ACCOUNT } from './createAccount.gql';
import Toast from 'react-native-toast-message';
import Identify from '@utils/Identify'

export const createAccount = (props) => {
  const [info, setInfo] = useState({});
  const { navigation } = props;

  const [createCustomer, { loading, error, data }] = useMutation(CREATE_ACCOUNT);
  useEffect(() => {
    if (loading) {
      console.log('loading...');
    } else if (!loading && data) {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: Identify.__('Create Account successfully')
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 4000,
      });
      // console.log(info)
      navigation.navigate('MyAccount', { info: info });
      // AppStorage.saveData('guest_cart_id', data.id)
    }
    if (error) {
      Toast.show({
        type: 'customError',
        props: {
          text2: Identify.__(error.toString())
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 4000,
      });
    }
  }, [loading, data, error]);
  const handleSubmit = useCallback(async ({ firstname, lastname, email, password }) => {
    setInfo({ email: email, password: password });
    createCustomer({
      variables: {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      },
    });
  });
  return {
    error: error,
    data: data,
    loading: loading,
    handleSubmit,
  };
};
