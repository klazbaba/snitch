import React, { Component, createRef } from 'react';
import { ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import { Fab } from 'native-base';

import { styles } from './styles';
import ContactDetails from './_components/ContactDetails';
import CustomText from '../_components/customText';

interface Props {}

interface State {
  numberOfContactShown: number;
  animateFirstContactWrapper: boolean;
}

const { height } = Dimensions.get('window');
const secondWrapper = new Animated.Value(-height);
const thirdWrapper = new Animated.Value(-height);

export default class SetupScreen extends Component<Props, State> {
  state = {
    numberOfContactShown: 1,
    animateFirstContactWrapper: false
  };

  animateUpward = (wrapper: Animated.Value) => {
    Animated.timing(wrapper, {
      toValue: 0,
      duration: 1500
    }).start();
  };

  handleFabPress = () => {
    const { numberOfContactShown } = this.state;

    if (numberOfContactShown === 1) this.animateUpward(secondWrapper);
    else if (numberOfContactShown === 2) this.animateUpward(thirdWrapper);
    this.setState({ numberOfContactShown: numberOfContactShown + 1 });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ContactDetails style={styles.firstContactDetails} />

          <ContactDetails style={{ bottom: secondWrapper }} />
          <ContactDetails style={{ bottom: thirdWrapper }} />
        </ScrollView>

        <Fab style={styles.fab} onPress={this.handleFabPress}>
          <CustomText text={'\u002B'} style={styles.plusIcon} />
        </Fab>
      </SafeAreaView>
    );
  }
}
