import Constants from '../../../../../constants';

export default {
  headerRoot: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: Constants.alignSize[2],
    borderBottomWidth: 1,
    borderBottomColor: Constants.color.gray.lightest,
    paddingVertical: Constants.alignSize[2],
    marginTop: Constants.alignSize[3],
  },
  productNameLabel: { width: '78%' },
  qtyLabel: { flex: 1, textAlign: 'center' },
};
