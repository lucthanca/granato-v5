import Constants from '../../../constants';
import { Dimensions } from 'react-native';

export const ADD_TO_CART_BTN_MIN_WIDTH = 135;
const BOX_HEIGHT = Constants.button.height.primary + Constants.alignSize[3] * 2;

export default {
  root: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Constants.alignSize[4],
    paddingVertical: Constants.alignSize[2],
    // borderRadius: Constants.borderRadius['md'],
    borderTopLeftRadius: Constants.borderRadius.md,
    borderTopRightRadius: Constants.borderRadius.md,
    backgroundColor: Constants.color.white.normal,
    ...Constants.boxShadow.lg,
  },
  addToCartBtn: {
    backgroundColor: Constants.color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: ADD_TO_CART_BTN_MIN_WIDTH,
    borderRadius: Constants.borderRadius.xs,
    // paddingHorizontal: Constants.alignSize[3],
    height: Constants.button.height.primary,
  },
  addToCartText: {
    color: Constants.color.white.normal,
    marginLeft: Constants.alignSize[1],
  },
  addToCartIcon: { fontSize: Constants.fontSize.xl, color: Constants.color.midnightblue.normal },
  addToCartAnimIcon: { width: 32 },
};
