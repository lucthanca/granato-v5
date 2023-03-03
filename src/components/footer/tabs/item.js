import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import t from '../../../utils/identify';
import defaultStyles from './item.style';
import mergeStyles from '../../../utils/mergeStyles';
import { string, object, bool } from 'prop-types';
import Constants from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const TabItem = props => {
  const { label, style, iconName, activeColor = Constants.color.primary, isActive, routeName } = props;
  const styles = mergeStyles(defaultStyles, style);
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(routeName)} style={styles.root}>
      <Icon name={iconName} style={[styles.icon, isActive ? { color: activeColor } : {}]} />
      <Text style={styles.label}>{t.__(label)}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(TabItem);

TabItem.propTypes = {
  label: string.isRequired,
  style: object,
  iconName: string,
  activeColor: string,
  isActive: bool,
  routeName: string,
};
