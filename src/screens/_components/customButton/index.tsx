import React from 'react';
import { Button } from 'native-base';

import CustomText from '../customText';

interface Props {
  text: string;
  style?: object;
  textStyle?: object;
  onPress: () => void;
}

export default function CustomButton(props: Props) {
  return (
    <Button style={props.style} onPress={props.onPress}>
      <CustomText text={props.text} style={props.textStyle} />
    </Button>
  );
}
