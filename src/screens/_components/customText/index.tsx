import React from 'react';
import { Text, TextProperties, StyleSheet } from 'react-native';

interface Props extends TextProperties {
  text: string;
}

const CustomText = (props: Props) => (
  <Text style={styles.text} {...props}>
    {props.text}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16
  }
});

export default CustomText;
