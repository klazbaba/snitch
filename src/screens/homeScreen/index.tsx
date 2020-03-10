import React, { Component } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import CustomText from '../_components/customText';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomText text='Home Screen' />
      </View>
    );
  }
}
