import { Dimensions } from 'react-native';
import Constants from '../../../../constants';
import boxToCartStyle, { ADD_TO_CART_BTN_MIN_WIDTH } from '../boxToCart.style';

const { height } = Dimensions.get('window');
export default {
  addToCartButton: {
    ...boxToCartStyle.addToCartBtn,
    marginHorizontal: Constants.alignSize[2],
    marginBottom: Constants.alignSize[2],
  },
  addToCartButtonDisabled: {
    backgroundColor: Constants.color.gray.lightest,
  },
  addToCartTextDisabled: {
    color: Constants.color.gray.lighter,
  },
  addToCartAnimIcon: {
    ...boxToCartStyle.addToCartAnimIcon,
  },
  addToCartText: boxToCartStyle.addToCartText,
  scrollContent: {
    marginVertical: Constants.alignSize[2],
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Constants.color.gray.lightest,
    paddingVertical: Constants.alignSize[2],
    paddingBottom: Constants.alignSize[3],
  },
  qtyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Constants.alignSize[2],
  },

  imagePreviewContent: {
    margin: Constants.alignSize[2],
    marginVertical: 0,
    height: 100,
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: Constants.borderRadius.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceBox: {
    flex: 1,
    marginLeft: Constants.alignSize[2],
    marginBottom: Constants.alignSize[2],
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  finalPriceText: {
    fontSize: Constants.fontSize.lg,
    color: Constants.color.red.darker,
    fontWeight: '600',
  },
  seperatorLine: {
    height: 1,
    width: '100%',
    backgroundColor: Constants.color.gray.lightest,
    marginVertical: Constants.alignSize[2],
  },
  unSupportedTypeRoot: {
    paddingHorizontal: Constants.alignSize[2],
  },
  unSupportedTypeText: {
    fontStyle: 'italic',
    textAlign: 'center',
    color: Constants.color.gray.lighter,
  },
};
