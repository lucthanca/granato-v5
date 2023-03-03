import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Constants from '../../../constants';
import { number } from 'prop-types';

const Qty = props => {
  const { initValue, setQty } = props;
  const style = {
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      textAlign: 'center',
      borderWidth: 1,
      borderColor: Constants.color.gray.lighter,
      width: 64,
      marginLeft: Constants.alignSize[1],
      borderRadius: Constants.borderRadius.xs,
      height: Constants.button.height.primary,
    },
  };
  return (
    <View style={style.root}>
      <Text>Qty</Text>
      <TextInput
        keyboardType="numeric"
        style={style.input}
        defaultValue={initValue.toString()}
        onChangeText={a => setQty(parseFloat(a))}
      />
    </View>
  );
};

export default Qty;
Qty.propTypes = {
  initValue: number,
};
