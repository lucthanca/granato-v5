import { StyleSheet } from 'react-native';
export default (defaultStyles, propStyles) => {
  const defaultKeys = Object.keys(defaultStyles);
  const composedStyles = {};
  defaultKeys.every(key => {
    composedStyles[key] = StyleSheet.flatten(
      StyleSheet.compose(StyleSheet.create(defaultStyles[key]), StyleSheet.create(propStyles?.[key] || {})),
    );
    return true;
  });
  return composedStyles;
};
