import Constants from '../../../../../constants';

export default {
  root: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: Constants.borderRadius.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', aspectRatio: 1 },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 99,
  },
  fullScreenViewIcon: {
    position: 'absolute',
    top: Constants.alignSize[1],
    right: Constants.alignSize[1],
    padding: Constants.alignSize[1],
    borderRadius: Constants.borderRadius.rounded,
    backgroundColor: Constants.color.black.moreLight,
  },
};
