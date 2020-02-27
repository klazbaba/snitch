import { StyleSheet, Platform } from 'react-native';

import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16
  },
  plusIcon: {
    fontSize: 48,
    lineHeight: Platform.OS === 'ios' ? 0 : null
  },
  fab: {
    justifyContent: 'center',
    backgroundColor: colors.orange
  },
  otherContacts: {
    height: 0
  },
  firstContactDetails: {
    position: null,
    bottom: null
  },
  button: {
    margin: 24
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: '50%',
    right: '50%'
  }
});
