import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'green',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    height: 18,
    width: 18,
    borderRadius: 17,
    backgroundColor: '#FF5F59',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -7,
    right: 30,
  },
  textBadge: { color: '#FFFFFF', fontSize: 10 },
});
