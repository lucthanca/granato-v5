import { Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import Value from './value';
import mergeStyles from '../../../../../utils/mergeStyles';
import defaultStyles from './configurableOption.style';
import { func, object, bool } from 'prop-types';
// import t from 'simicart-example/utils/Identify';

const ConfigurableOption = props => {
  const { option, style: propStyles = {}, drawSeperatorLine = false, onValueSelected } = props;
  const { label, values } = option;
  const styles = mergeStyles(defaultStyles, propStyles);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const handleSelectValue = React.useCallback(
    uid => {
      setSelectedValue(prev => {
        if (prev === uid) {
          return null;
        }
        return uid;
      });
      if (onValueSelected) {
        onValueSelected({ code: option.attribute_code, value: uid });
      }
    },
    [onValueSelected, option.attribute_code],
  );
  return (
    <>
      <View style={styles.root}>
        <Text style={styles.attributeLabel}>{label}</Text>
        <View style={styles.valueWrapper}>
          {values &&
            values.map(vale => (
              <TouchableOpacity key={vale.uid} onPress={() => handleSelectValue(vale.uid)} activeOpacity={0.5}>
                <Value value={vale} isSelected={selectedValue === vale.uid} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
      {drawSeperatorLine && <View style={styles.seperatorLine} />}
    </>
  );
};

export default memo(ConfigurableOption);

ConfigurableOption.propTypes = {
  onValueSelected: func,
  option: object,
  drawSeperatorLine: bool,
};
