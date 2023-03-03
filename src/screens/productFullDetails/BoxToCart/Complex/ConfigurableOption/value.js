import { Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import mergeStyles from '../../../../../utils/mergeStyles';
import defaultStyles from './value.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { bool, object } from 'prop-types';

const Value = props => {
  const { value, style: propStyles = {}, isSelected } = props;
  const { swatch_data, store_label } = value;
  const styles = mergeStyles(defaultStyles, propStyles);

  const swatchColorMatch = swatch_data && swatch_data.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g);
  const isColorSwatch = swatchColorMatch?.length > 0;

  return (
    <View style={[styles.root, isSelected ? styles.rootSelected : {}]}>
      <Text style={[isColorSwatch ? { ...styles.activeColorSwatch, backgroundColor: swatch_data.value } : {}]}>
        {isColorSwatch ? '' : swatch_data ? swatch_data.value : store_label}
      </Text>
      {isSelected && (
        <>
          <View style={styles.selectedConner} />
          <Icon name={'check'} style={styles.checkedIcon} />
        </>
      )}
    </View>
  );
};

export default memo(Value);

Value.propTypes = {
  value: object.isRequired,
  isSelected: bool,
};
