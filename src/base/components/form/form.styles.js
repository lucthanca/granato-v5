import { StyleSheet, Platform } from 'react-native';
import Constants from '../../../constants';

export default StyleSheet.create({
  title: {
    fontSize: Constants.fontSize.base,
  },
  border: {
    borderRadius: Constants.borderRadius.xs,
    borderBottomWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? Constants.alignSize[4] : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputView: {
    flexDirection: 'row',
    width: '93%',
    alignItems: 'center',
  },
  iconTitle: {
    paddingRight: Constants.alignSize[3],
    fontSize: Constants.fontSize.md,
  },
  arrowIcon: {
    fontSize: Constants.fontSize.md,
    paddingHorizontal: Constants.alignSize[3],
  },
  pickerField: {
    marginVertical: Constants.alignSize[3],
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: Constants.alignSize[3],
  },
});
