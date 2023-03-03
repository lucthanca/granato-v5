import Constants from '../../constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listAddrContainer: {
    flex: 1,
    padding: Constants.alignSize[4],
  },
  addAddressButton: {
    paddingHorizontal: Constants.alignSize[3],
    paddingVertical: Constants.alignSize[2],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Constants.borderRadius.xs,
    borderWidth: 1,
    borderColor: Constants.color.gray.lighter,
    shadowColor: '#000',
  },
  leftAddAddrButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInAddAddrButton: {
    fontWeight: 'bold',
    paddingLeft: Constants.alignSize[5],
    fontSize: Constants.fontSize.md,
  },
  normalText: {
    margin: Constants.alignSize[3],
    fontSize: Constants.fontSize.base,
  },
  itemContainer: {
    // flex: 1,
    paddingHorizontal: Constants.alignSize[3],
    paddingVertical: Constants.alignSize[2],
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Constants.borderRadius.xs,
    borderWidth: 1,
    marginBottom: Constants.alignSize[3],
    borderColor: Constants.color.gray.lighter,
    shadowColor: '#000',
  },
  textInItem: {
    fontSize: Constants.fontSize['2sm'],
  },
  deleteModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContent: {
    // flex: 1,
    height: 150,
    width: '80%',
    backgroundColor: Constants.color.white.normal,
    borderRadius: Constants.borderRadius.sm,
  },
  titleDeleteModal: {
    textAlign: 'center',
    marginTop: Constants.alignSize[5],
    marginBottom: Constants.alignSize[8],
    fontSize: Constants.fontSize.lg,
  },
  optDeleteModal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonYes: {
    width: '40%',
    height: Constants.button.height.primary,
    borderWidth: 3,
    borderColor: Constants.button.color.primary,
    borderRadius: Constants.borderRadius.sm,
    alignItems: 'center',
    backgroundColor: Constants.button.color.primary,
    justifyContent: 'center',
  },
  buttonNo: {
    width: '40%',
    height: Constants.button.height.primary,
    borderWidth: 3,
    borderColor: Constants.button.color.primary,
    borderRadius: Constants.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textYes: {
    color: Constants.color.white.normal,
    fontSize: Constants.fontSize.lg,
    fontWeight: 'bold',
  },
  textNo: {
    color: Constants.button.color.primary,
    fontSize: Constants.fontSize.lg,
    fontWeight: 'bold',
  },
});
