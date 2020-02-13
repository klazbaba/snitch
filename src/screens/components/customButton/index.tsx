import React from 'react';
import { Button } from 'native-base';

import CustomText from '../customText';

interface Props {
  text: string;
  style?: object;
  textStyle?: object;
}

export default function CustomButton(props: Props) {
  return (
    <Button style={props.style}>
      <CustomText text={props.text} style={props.textStyle} />
    </Button>
  );
}
