import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SinglePrice } from './index';
import mergeStyles from '../../utils/mergeStyles';
import defaultStyles from './regularPrice.style';
import t from '../../utils/identify';
import { object, shape } from 'prop-types';

const RegularPrice = props => {
  const { price, style } = props;
  const styles = mergeStyles(defaultStyles, style);

  const { root, text, ...rest } = styles;

  if (!price) {
    return null;
  }
  return (
    <View style={[root]}>
      <Text style={[text]}>{t.__('Regular Price: ')}</Text>
      <SinglePrice value={price.value} currencyCode={price.currency} style={{ root, text, ...rest }} />
    </View>
  );
};

export default React.memo(RegularPrice);
RegularPrice.propTypes = {
  price: object,
  style: shape({
    root: object,
    text: object,
  }),
};
