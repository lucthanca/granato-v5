import Constants from '../../../constants';
import { Dimensions } from 'react-native';

const { width: screenW } = Dimensions.get('window');
export default {
  root: {
    borderWidth: 1,
    borderColor: Constants.color.gray.lighter,
    width: screenW / 3.5,
    // paddingHorizontal: Constants.alignSize[1],
    marginRight: Constants.alignSize[2],
    marginTop: Constants.alignSize[2],
    backgroundColor: Constants.color.white.normal,
    borderRadius: Constants.borderRadius.xs,
  },
  productContainer: {
    width: '100%',
    height: 'auto',
    // borderWidth: 2, borderColor: 'green'
  },
  pImageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  wishlistIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: screenW / 3.5 / 4,
    aspectRatio: 1,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  imageNoPadding: {
    width: '100%',
    aspectRatio: 1,
    // borderWidth: 3, borderColor: 'blue',
  },
  productInfo: {
    margin: Constants.alignSize[1],
  },
  productNameText: {
    fontSize: Constants.fontSize.sm,
  },
  priceBox: {
    finalPrice: {
      text: {
        fontSize: Constants.fontSize['2sm'],
        color: Constants.color.red.darker,
        fontWeight: '600',
      },
    },
    asLowAsText: {
      fontSize: Constants.fontSize.sm,
      color: Constants.color.gray.darker,
    },
    regularPrice: {
      text: {
        fontSize: Constants.fontSize.xs,
      },
    },
  },
};
