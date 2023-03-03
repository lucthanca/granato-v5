import Constants from '../../../../constants';
import boxToCartStyle from '../boxToCart.style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  addToCartButton: {
    ...boxToCartStyle.addToCartBtn,
    flex: 1,
  },
  addToCartButtonDisabled: {
    backgroundColor: Constants.color.gray.lightest,
  },
  addToCartAnimIcon: {
    ...boxToCartStyle.addToCartAnimIcon,
  },
  addToCartText: boxToCartStyle.addToCartText,
  addToCartTextDisabled: {
    color: Constants.color.gray.lighter,
  },
});
