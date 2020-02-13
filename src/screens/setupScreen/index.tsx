import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { styles } from './styles';
import CustomText from '../_components/customText';

export default class SetupScreen extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <CustomText text='Mafo' />
      </ScrollView>
    );
  }
}
