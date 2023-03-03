import { StyleSheet } from 'react-native';
import Constants from '../../../constants';

export default StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingHorizontal: Constants.alignSize[4],
    paddingTop: Constants.alignSize[3],
    paddingBottom: Constants.alignSize[4],
    justifyContent: 'space-between',
  },
  deleteAccButton: {
    width: '100%',
    height: Constants.button.height.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.button.color.primary,
    borderRadius: Constants.borderRadius.rounded,
  },
  textInDeleteAccButton: {
    fontSize: Constants.fontSize.md,
    color: Constants.color.white.normal,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Constants.color.gray.lighter,
    borderRadius: Constants.borderRadius.xs,
    paddingVertical: Constants.alignSize[4],
    marginVertical: Constants.alignSize[1],
  },
  icon: {
    fontSize: Constants.fontSize.lg,
    paddingHorizontal: Constants.alignSize[3],
  },
  title: {
    fontSize: Constants.fontSize.md,
  },
  arrowIcon: {
    fontSize: Constants.fontSize.md,
    color: Constants.color.gray.lighter,
    paddingHorizontal: Constants.alignSize[3],
  },
});
