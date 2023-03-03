import React from 'react';
import Item from './item';
import { Text, View } from 'react-native';
import { useGetCart } from '../../../talons/checkout/cart/useGetCart';
import styles from './cart.style';
const TabHome = props => {
  const { total } = useGetCart();
  const badge = React.useMemo(() => {
    return total ? total : -1;
  }, [total]);
  return (
    <View style={styles.root}>
      <Item label='Cart' iconName='cart-outline' {...props} style={{ root: null }} />
      {badge != -1 ? (
        <View style={styles.badge}>
          <Text style={styles.textBadge}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TabHome;
