import { StyleSheet } from 'react-native';
import Constants from '../../constants';

export default StyleSheet.create({
  signInContainer: {
    padding: Constants.alignSize[4],
    justifyContent: 'center',
    flex: 1,
  },
  rememberMeButton: {
    marginVertical: Constants.alignSize[4],
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeIcon: {
    marginRight: Constants.alignSize[3],
    fontSize: Constants.fontSize.lg,
  },
  rememberMeText: {
    fontSize: Constants.fontSize.base,
  },
  signInButton: {
    width: '100%',
    height: Constants.button.height.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Constants.alignSize[4],
  },
  signInText: {
    fontSize: Constants.fontSize.md,
    color: Constants.color.white.normal,
  },
  forgotPassView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPassText: {
    color: Constants.button.color.primary,
    fontWeight: 'bold',
    fontSize: Constants.fontSize.md,
  },
  orView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Constants.alignSize[4],
  },
  line: {
    height: 1,
    width: '45%',
    backgroundColor: Constants.color.gray.darker,
  },
  orText: {
    color: Constants.color.gray.darker,
    fontSize: Constants.fontSize.xl,
  },
  createAccountButton: {
    width: '100%',
    height: Constants.button.height.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Constants.color.gray.dark,
    marginTop: Constants.alignSize[3],
  },
  createAccountText: {
    fontSize: Constants.fontSize.md,
  },
  forgotPassPageContainer: {
    padding: 12,
    paddingTop: 10,
    flex: 1,
  },
  titleForgotPassPage: {
    fontSize: Constants.fontSize.lg,
  },
  resetPassButton: {
    width: '100%',
    height: Constants.button.height.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Constants.alignSize[4],
  },
  resetPassText: {
    fontSize: Constants.fontSize.md,
    color: Constants.color.white.normal,
  },
});
