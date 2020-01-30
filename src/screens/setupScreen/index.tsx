import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { styles } from './styles';
import CustomText from '../components/customText';

interface Props {}

export default class SetupScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <CustomText text={'Hello, welcome to Snitch.'} style={styles.title} />
          <CustomText
            text='Our goal is to help your loved ones find you in case you illegally got picked up.'
            style={styles.subTitle}
          />
          <CustomText
            text='To be able to use our services, we will need you to supply a few information to us.'
            style={styles.subTitle}
          />
        </View>

        <View style={styles.bigBackground} />
        <Svg
          width={291}
          height={260}
          viewBox='0 0 198 177'
          style={{ position: 'absolute', left: 0, bottom: 0 }}
          {...this.props}
        >
          <Path
            d='M0-33v210h239c-84.396.96-145.73-15.373-184-49C16.73 94.373-1.604 40.706 0-33z'
            fill='#64DC64'
            fillRule='evenodd'
          />
        </Svg>
      </View>
    );
  }
}
