import Constants from '../../../../../constants';

export default {
  root: { flexDirection: 'column', marginHorizontal: Constants.alignSize[1] },
  attributeLabel: { marginLeft: Constants.alignSize[1] },
  valueWrapper: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Constants.alignSize[1] },
  seperatorLine: { height: 1, backgroundColor: Constants.color.gray.lightest, marginVertical: Constants.alignSize[3] },
};
