import React, { memo, forwardRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import defaultStyles from './qty.style';
import mergeStyles from '../../../../utils/mergeStyles';
import { useQty } from '../../../../talons/product/boxToCart/Complex/useQty';
import Constants from '../../../../constants';
import { func, number } from 'prop-types';

const Qty = (props, ref) => {
  const { initQty = 1, onQtyChange } = props;
  const styles = mergeStyles(defaultStyles, props.style);

  const talonProps = useQty({ ref, initQty, onQtyChange });
  const { handleQtyChange, inputRef, qty, handleOnEndEditing, handleQtyDecrease, handleQtyInCrease } = talonProps;

  console.log('RENDER QTY');
  return (
    <View style={[styles.qtyBox]}>
      <TouchableOpacity onPress={handleQtyDecrease} disabled={isNaN(parseFloat(qty)) || parseFloat(qty) <= initQty}>
        <Icon
          name={'minus'}
          style={[
            styles.qtyAction,
            isNaN(parseFloat(qty)) || parseFloat(qty) <= initQty ? { color: Constants.color.gray.lightest } : {},
          ]}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.qtyInput]}
        returnKeyType={'done'}
        onChangeText={handleQtyChange}
        ref={inputRef}
        defaultValue={initQty.toString()}
        value={qty.toString()}
        onEndEditing={handleOnEndEditing}
        keyboardType={'number-pad'}
      />
      <TouchableOpacity onPress={handleQtyInCrease}>
        <Icon name={'plus'} style={[styles.qtyAction]} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(forwardRef(Qty));

Qty.propTypes = {
  initQty: number,
  onQtyChange: func,
};
