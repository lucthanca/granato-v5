import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOut } from '../../../talons/customer/signOut/signOut';

import { createCart } from '../../../talons/checkout/cart/createCart';
import Toast from 'react-native-toast-message';
import Spinner from '../../../components/Spinner';
import styles from './menu.styles';
import Identify from '../../../utils/identify';
import { useUserContext } from '../../../context/user';
import { useCartContext } from '../../../context/cart';

const Item = props => {
  const { lable, iconName, navigation, routeName } = props;
  const [, { signOut: SignOut }] = useUserContext();
  const { revokeToken, revokeTokenLoading } = signOut();
  const { createCartGuest, createCartGuestLoading } = createCart();
  const [, { createCart: contextCreateCart }] = useCartContext();

  const isLoading = useMemo(() => {
    return revokeTokenLoading || createCartGuestLoading;
  }, [revokeTokenLoading, createCartGuestLoading]);

  const selectItem = async () => {
    if (lable == 'Sign Out') {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: 'Sign out successfully',
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 2000,
      });
      await navigation.navigate('Home');
      await SignOut({ revokeToken });
      await contextCreateCart({ fetchCartId: createCartGuest });
    } else {
      navigation.navigate(routeName);
    }
  };

  return (
    <View>
      <Spinner visible={isLoading} animDuration={750} />
      <TouchableOpacity onPress={() => selectItem()} style={styles.item}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {lable !== 'Sign Out' ? (
            <FontAwesome5 name={iconName} style={styles.icon} />
          ) : (
            <Ionicons name={iconName} style={{ fontSize: 20, paddingHorizontal: 10 }} />
          )}
          <Text style={styles.title}>{Identify.__(lable)}</Text>
        </View>
        {lable == 'Sign Out' ? null : <FontAwesome5 name="arrow-right" style={styles.arrowIcon} />}
      </TouchableOpacity>
    </View>
  );
};

export default Item;
