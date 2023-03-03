import React from 'react';
import { View } from 'react-native';
import { TabHome, TabCategory, TabAccount, TabCart } from './tabs';
import styles from './footer.style';

const Footer = props => {
  return (
    <View style={styles.root}>
      <TabHome routeName={'Home'} />
      <TabCategory routeName={'Category'} />
      <TabAccount routeName={'MyAccount'} />
      <TabCart routeName={'Cart'} />
    </View>
  );
};

export default Footer;
