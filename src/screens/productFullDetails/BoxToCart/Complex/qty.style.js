import Constants from '../../../../constants';
export default {
  qtyBox: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    borderColor: Constants.color.gray.lightest,
  },
  qtyInput: {
    height: '100%',
    fontSize: Constants.fontSize.sm,
    paddingVertical: 0,
    color: Constants.color.primary.normal,
    textAlign: 'center',
  },
  qtyAction: {
    paddingHorizontal: Constants.alignSize[2],
  },
};
