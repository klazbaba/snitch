import React from "react";
import { Text, TextProperties, StyleSheet } from "react-native";

interface Props extends TextProperties {
  text: string;
  children?: JSX.Element;
  bold?: boolean;
}

const CustomText = (props: Props) => (
  <Text
    style={[styles.text, props.bold ? { fontWeight: "bold" } : null]}
    {...props}
  >
    {props.text}
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default CustomText;
