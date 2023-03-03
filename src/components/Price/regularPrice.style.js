import Constants from '../../constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: { flexDirection: 'row' },
  text: {
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: Constants.fontSize.sm,
    color: Constants.color.gray.darker,
  },
});
