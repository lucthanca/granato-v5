import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT } from '../../base/components/Header/styles';

export const ICON_SIZE = 24;
export default StyleSheet.create({
  root: { height: HEADER_HEIGHT, flexDirection: 'row', alignItems: 'center' },
  search: { height: ICON_SIZE },
  cartContainer: { marginLeft: 10 },
  cartIcon: { width: ICON_SIZE, height: ICON_SIZE },
  badge: {
    height: 19,
    width: 19,
    borderRadius: 17,
    backgroundColor: '#FF5F59',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -7,
    right: -10,
  },
  textBadge: { color: '#FFFFFF', fontSize: 9 },
});
