import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  buttomSection: {
    backgroundColor: colors.white,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    height: 40,
    paddingHorizontal: 8,
    width: 100,
  },
});
