import React from 'react';
import { Text } from 'react-native';

interface Props {
  text: string;
  style?: object;
}

const CustomText = (props: Props) => <Text style={props.style}>{props.text}</Text>;

export default CustomText;
