import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { number, string, shape, object } from 'prop-types';
import patches from '../../utils/intlPatches';

const Price = props => {
  const { value, currencyCode, style = priceStyle } = props;

  const parts = patches.toParts.call(
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }),
    value,
  );
  const children = parts.map((part, i) => {
    const partStyle = style[part.type];
    const key = `${i}-${part.value}`;

    return (
      <View key={key} style={partStyle}>
        <Text style={{ ...style.text }}>{part.value}</Text>
      </View>
    );
  });

  return <View style={{ ...style.root, flexDirection: 'row' }}>{children}</View>;
};

Price.propTypes = {
  customStyles: shape({
    root: object,
    text: object,
  }),
  /**
   * The numeric price
   */
  value: number.isRequired,
  /**
   * A string with any of the currency code supported by Intl.NumberFormat
   */
  currencyCode: string.isRequired,
};

Price.defaultProps = {};
const priceStyle = StyleSheet.create({
  root: {},
  text: { fontSize: 16, color: '#a83e32', fontWeight: '600' },
  currency: { marginRight: 5 },
});
export default Price;
