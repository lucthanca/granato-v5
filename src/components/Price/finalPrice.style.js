import Constants from '../../constants';

export default {
  root: {},
  asLowAsText: { color: Constants.color.gray.darker },
  finalPrice: {},
  exclPriceStyle: {
    root: { flexDirection: 'row' },
    text: {
      fontSize: Constants.fontSize.xs,
      color: Constants.color.gray.dark,
    },
    value: { fontWeight: 'bold' },
  },
  regularPrice: {},
};
