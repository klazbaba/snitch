import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import { Fab, Toast } from 'native-base';

import { styles } from './styles';
import ContactDetails from './_components/ContactDetails';
import CustomText from '../_components/customText';
import CustomButton from '../_components/CustomButton';

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
      duration: wrapper === secondWrapper ? 1500 : 1000
    }).start();
  };

  handleFabPress = () => {
    const { numberOfContactShown } = this.state;

    if (numberOfContactShown === 1) this.animateUpward(secondWrapper);
    else if (numberOfContactShown === 2) this.animateUpward(thirdWrapper);
    else if (numberOfContactShown > 2)
      Toast.show({
        text: 'You have already added the maximum number of contacts!',
        duration: 2500
      });
    this.setState({ numberOfContactShown: numberOfContactShown + 1 });
  };

  saveContacts = () => {};

  render() {
    const { numberOfContactShown } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ContactDetails style={styles.firstContactDetails} />

          {numberOfContactShown > 1 ? <ContactDetails style={{ bottom: secondWrapper }} /> : null}
          {numberOfContactShown > 2 ? (
            <>
              <ContactDetails style={{ bottom: thirdWrapper }} />
              <CustomButton text='Save' onPress={this.saveContacts} style={styles.button} />
            </>
          ) : null}
        </ScrollView>

        <Fab style={styles.fab} onPress={this.handleFabPress}>
          <CustomText text={'\u002B'} style={styles.plusIcon} />
        </Fab>
      </SafeAreaView>
    );
  }
}
