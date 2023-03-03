import Constants from '../../../../../constants';

export default {
  root: {
    marginHorizontal: Constants.alignSize[1],
    padding: Constants.alignSize[1],
    paddingHorizontal: Constants.alignSize[2],
    backgroundColor: Constants.color.gray.lightest,
    borderRadius: Constants.borderRadius.xs,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Constants.color.gray.lightest,
  },

  rootSelected: {
    borderColor: Constants.color.primary.normal,
  },

  selectedConner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 16,
    borderTopWidth: 16,
    borderRightColor: 'transparent',
    borderTopColor: Constants.color.primary.normal,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  checkedIcon: { position: 'absolute', top: 1, left: 1, fontSize: 8, color: 'white', zIndex: 9 },
  activeColorSwatch: {
    height: 28,
    aspectRatio: 1,
  },
};
