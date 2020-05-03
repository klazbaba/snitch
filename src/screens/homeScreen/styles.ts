import { StyleSheet } from "react-native";

import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contactsButton: {
    marginTop: 40,
  },
  modalContent: {
    padding: 24,
    backgroundColor: colors.white,
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    borderRadius: 8,
  },
});
