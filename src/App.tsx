import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import { Root } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const SetupStack = createStackNavigator(
  {
    WelcomeScreen: {
      getScreen: () => require('./screens/welcomeScreen').default
    },
    SetupScreen: {
      getScreen: () => require('./screens/setupScreen').default
    }
  },
  {
    headerMode: 'none'
  }
);

const MainStack = createStackNavigator({
  HomeScreen: {
    getScreen: () => require('./screens/homeScreen').default
  }
});

const AppRoute = createSwitchNavigator({
  SetupStack,
  MainStack
});
const Route = createAppContainer(AppRoute);

export default class Routes extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem('contactDetails').then(ContactDetails => console.warn(ContactDetails));
  }

  render() {
    return (
      <Root>
        <Route />
      </Root>
    );
  }
}
