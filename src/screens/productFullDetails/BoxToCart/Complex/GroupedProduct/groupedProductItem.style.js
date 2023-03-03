import Constants from '../../../../../constants';

export default {
  root: {
    margin: Constants.alignSize[2],
    // borderWidth: 2,
    borderColor: 'blue',
    flex: 1,

    flexDirection: 'column',
  },
  productInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pInfoWrapper: {
    maxWidth: '78%',
    flexDirection: 'column',
  },
  productNameText: {
    // borderWidth: 2,
    borderColor: 'red',
    fontSize: Constants.fontSize.base,
  },
  qtyBox: {},
  priceBox: {
    finalPrice_text: { color: Constants.color.red.darker, fontWeight: '700' },
    root: {
      marginVertical: Constants.alignSize[1],
    },
  },
};
