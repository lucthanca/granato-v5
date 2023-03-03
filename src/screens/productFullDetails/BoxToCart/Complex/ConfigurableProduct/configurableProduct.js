import React, { forwardRef, memo } from 'react';
import { useCPAddToCart } from '../../../../../talons/product/boxToCart/Complex/type/useCPAddToCart';
import defaultStyles from './configurableProduct.style';
import mergeStyles from '../../../../../utils/mergeStyles';
import ConfigurableOption from '../ConfigurableOption';
import { object, func } from 'prop-types';
import { Text, View } from 'react-native';
import configurableOptionStyle from '../ConfigurableOption/configurableOption.style';
import Qty from '../qty';

const ConfigurableProduct = (props, ref) => {
  const { qtyRef, ...restProps } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useCPAddToCart({ ref, qtyRef, ...restProps });
  const { configurableOptions, handleSelectedOption } = talonProps;
  console.log('RENDER configurable options');
  return (
    <>
      {configurableOptions &&
        configurableOptions.map((option, index) => (
          <ConfigurableOption
            onValueSelected={handleSelectedOption}
            key={option.uid}
            option={option}
            drawSeperatorLine={configurableOptions.length > index + 1}
          />
        ))}
      <View style={configurableOptionStyle.seperatorLine} />
      <View style={[styles.qtyWrapper]}>
        <Text>Qty</Text>
        <Qty ref={qtyRef} />
      </View>
    </>
  );
};

export default memo(forwardRef(ConfigurableProduct));

ConfigurableProduct.propTypes = {
  product: object.isRequired,
  imagePreviewRef: object,
  whenAvailableAddToCart: func,
};
