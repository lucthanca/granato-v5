import { StyleSheet, Dimensions } from 'react-native';
const { width: screenW } = Dimensions.get('window');
export const HEADER_HEIGHT = 35;
const styles = StyleSheet.create({
  root: {
    width: screenW - 24 * 6,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
  },
  logo: { width: '100%', height: '100%' },
});
export default styles;
