import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import SignIn from '../signIn/signIn';

import Menu from '../../base/components/menu/menu';
import { useMyAccount } from '../../talons/customer/myAccount/useMyAccount';
import Spinner from '../../components/Spinner';
import { useUserContext } from '../../context/user';

export default function MyAccount(props) {
  const [{ isSignedIn }] = useUserContext();
  const { fetchUserDetails, fetchUserDetailsLoading } = useMyAccount();
  const [, { getUserDetails }] = useUserContext();
  useEffect(() => {
    if (isSignedIn) {
      getUserDetails({ fetchUserDetails });
    }
  }, []);

  const isLoading = useMemo(() => {
    return fetchUserDetailsLoading;
  }, [fetchUserDetailsLoading]);

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={isLoading} animDuration={750} />
      {isSignedIn ? (
        <Menu type="myAccount" navigation={props.navigation} />
      ) : (
        <SignIn navigation={props.navigation} info={props.route.params ? props.route.params.info : null} />
      )}
    </View>
  );
}
