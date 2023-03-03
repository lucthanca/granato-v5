import Constants from '../../constants';
import { StyleSheet } from 'react-native';

const WRAPPER_PADDING = Constants.alignSize[2];
export default StyleSheet.create({
  addToWishlistContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 64,
  },
  detailContent: { flex: 1, padding: WRAPPER_PADDING },
  productNameBox: { marginVertical: Constants.alignSize[2] },
  productSkuText: { color: Constants.color.gray.lighter },
  productNameText: { marginTop: Constants.alignSize[1], fontSize: Constants.fontSize.md },
  priceBox: StyleSheet.create({
    finalPrice_text: {
      fontSize: Constants.fontSize.lg,
      color: Constants.color.red.darker,
      fontWeight: '600',
    },
    currency: { marginRight: Constants.alignSize[1] },
    root: { marginVertical: Constants.alignSize[2] },
  }),
  tierPricesBox: { marginVertical: Constants.alignSize[2] },
});
