import { StyleSheet, Platform } from "react-native";

import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  plusIcon: {
    fontSize: 48,
    ...Platform.select({
      ios: {
        lineHeight: 0,
      },
    }),
  },
  fab: {
    justifyContent: "center",
    backgroundColor: colors.orange,
  },
  otherContacts: {
    height: 0,
  },
  firstContactDetails: {
    position: null,
    bottom: null,
  },
  button: {
    margin: 24,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
  },
});
