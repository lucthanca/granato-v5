import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, View } from "react-native";
import t from "../../../utils/identify";
import defaultStyles from "./item.style";
import mergeStyles from "../../../utils/mergeStyles";
import { string, object, bool } from "prop-types";
import Constants from "../../../constants";

const TabItem = props => {
  const { label, style, iconName, activeColor = Constants.color.primary, isActive } = props;
  const styles = mergeStyles(defaultStyles, style);
  return (
    <View style={styles.root}>
      <Icon name={iconName} style={[styles.icon, isActive ? { color: activeColor } : {}]} />
      <Text style={styles.label}>{t.__(label)}</Text>
    </View>
  );
};

export default React.memo(TabItem);

TabItem.propTypes = {
  label: string.isRequired,
  style: object,
  iconName: string,
  activeColor: string,
  isActive: bool,
};
