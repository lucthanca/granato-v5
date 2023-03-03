import Constants from '../../constants';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  root: {
    maxHeight: 64,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'blue',
    backgroundColor: '#fff',
    ...Constants.boxShadow.md,
    borderTopLeftRadius: Constants.alignSize[4],
    borderTopRightRadius: Constants.alignSize[4],
  },
});
