import React from "react";
import { Button } from "native-base";
import { StyleSheet } from "react-native";

import CustomText from "./CustomText";
import { colors } from "../colors";

interface Props {
  label: string;
  style?: object;
  textStyle?: object;
  onPress: any;
}

export default function CustomButton(props: Props) {
  return (
    <Button style={[styles.wrapper, props.style]} onPress={props.onPress}>
      <CustomText text={props.label} style={[styles.text, props.textStyle]} />
    </Button>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    backgroundColor: colors.brown,
    borderRadius: 8,
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
});
