import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import { Root } from 'native-base';

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

const AppRoute = createAppContainer(SetupStack);

export default class Routes extends Component {
  render() {
    return (
      <Root>
        <AppRoute />
      </Root>
    );
  }
}
