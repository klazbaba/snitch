import { StyleSheet } from 'react-native';

import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16
  },
  plusIcon: {
    fontSize: 48
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
  }
});
