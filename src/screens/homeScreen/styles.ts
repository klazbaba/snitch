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
    marginHorizontal: 16,
    marginVertical: 32,
    borderRadius: 8,
    position: "absolute",
    left: 24,
    right: 24,
    top: "20%",
  },
  contactsWrapper: {
    marginVertical: 8,
    backgroundColor: colors.lightgrey,
    borderRadius: 8,
    padding: 8,
  },
  navigationIconsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 40,
    paddingHorizontal: 16,
  },
  closeButton: {
    backgroundColor: colors.brown,
    justifyContent: "center",
    width: 100,
    alignSelf: "center",
  },
  pencil: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
