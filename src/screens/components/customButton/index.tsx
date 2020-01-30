import React from 'react';
import { Button } from 'native-base';
import CustomText from '../customText';

interface Props {
  text: string;
}

export default function CustomButton(props: Props) {
  return (
    <Button>
      <CustomText text={props.text} />
    </Button>
  );
}
