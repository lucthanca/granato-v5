import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Item from './item';
import styles from './menu.styles';
import Identify from '../../../utils/identify';

const Menu = props => {
  const { type, navigation } = props;
  let myAccountItems = [
    {
      iconName: 'user-alt',
      lable: 'Profile',
      routeName: 'CustomerPage',
    },
    {
      iconName: 'book-open',
      lable: 'Address Book',
      routeName: 'ListAddressesPage',
    },
    {
      iconName: 'heart',
      lable: 'My WishList',
      routeName: 'WishlistPage',
    },
    {
      iconName: 'list-ul',
      lable: 'Order History',
      routeName: 'OrdersPage',
    },
    {
      iconName: 'log-out',
      lable: 'Sign Out',
      routeName: null,
    },
  ];

  if (type === 'myAccount') {
    return (
      <View style={styles.menuContainer}>
        <View>
          {myAccountItems.map((item, index) => {
            return <Item iconName={item.iconName} lable={item.lable} routeName={item.routeName} navigation={navigation} />;
          })}
        </View>
        <TouchableOpacity style={styles.deleteAccButton}>
          <Text style={styles.textInDeleteAccButton}>{Identify.__('DELETE ACCOUNT')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

export default Menu;
