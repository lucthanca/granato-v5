import Constants from '../../../../../constants';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default {
  root: {},
  imageFullView: {
    backgroundColor: Constants.color.black.normal,
    bottom: -1 * height,
    left: 0,
    position: 'absolute',
    zIndex: 100,
    width,
    height,
  },
  closeIconWrapper: {
    position: 'absolute',
    top: Constants.alignSize[8],
    right: Constants.alignSize[4],
    paddingVertical: Constants.alignSize[1],
    paddingHorizontal: Constants.alignSize[4],
    // aspectRatio: 1,
    // width: Constants.fontSize['3xl'],
    backgroundColor: Constants.color.black.moreLight,
    borderRadius: Constants.borderRadius.rounded,
    width: Constants.fontSize['2xl'] + Constants.alignSize[4] * 2,
  },
  closeIcon: {
    fontSize: Constants.fontSize['2xl'],
    aspectRatio: 1,
    width: Constants.fontSize['2xl'],
    color: Constants.color.white.normal,
  },
};
