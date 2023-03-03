import Constants from '../../constants';
export default {
  backdrop: {
    backgroundColor: 'rgba(0,0,0, 0.25)',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0,
    zIndex: -1,
  },
  sheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Constants.boxShadow.lg,
    justifyContent: 'space-between',
    height: 'auto',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  popupTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  popupTopCloseIcon: {
    fontSize: Constants.fontSize.lg,
    fontWeight: 'bold',
    paddingHorizontal: Constants.alignSize[2],
    paddingVertical: Constants.alignSize[2],
  },
};
