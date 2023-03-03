import { StyleSheet } from 'react-native';
import Constants from '../../constants';

export default StyleSheet.create({
  formikContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Constants.alignSize[4],
    paddingTop: Constants.alignSize[3],
    paddingBottom: Constants.alignSize[4],
  },
  customerButton: {
    width: '100%',
    height: Constants.button.height.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerTextInButton: {
    fontSize: Constants.fontSize.md,
    color: Constants.color.white.normal,
  },
});
