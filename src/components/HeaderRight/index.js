import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import styles, { ICON_SIZE } from './headerRight.style';
import { useGetCart } from '../../talons/checkout/cart/useGetCart';

const HeaderRight = props => {
  const navigation = useNavigation();
  const { total } = useGetCart();
  const badge = React.useMemo(() => {
    return total ? total : -1;
  }, [total]);
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchPage');
        }}
        style={styles.search}>
        <Icon name="search1" size={ICON_SIZE} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}
        style={styles.cartContainer}>
        <Image source={require('../../assets/images/bottom/ic_cart.png')} style={styles.cartIcon} resizeMode="contain" />
        {badge != -1 ? (
          <View style={styles.badge}>
            <Text style={styles.textBadge}>{badge}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(HeaderRight);
