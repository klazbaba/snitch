import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Root } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/welcomeScreen';
import SetupScreen from './screens/setupScreen';

const SetupStack = createStackNavigator();

// const AppRoute = createSwitchNavigator({
//   SetupStack,
//   MainStack
// });
// const Route = createAppContainer(AppRoute);

export default class Routes extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem('contactDetails').then(ContactDetails => console.warn(ContactDetails));
  }

  render() {
    return (
      <Root>
        <NavigationContainer>
          <SetupStack.Navigator headerMode='none'>
            <SetupStack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <SetupStack.Screen name='SetupScreen' component={SetupScreen} />
          </SetupStack.Navigator>
          {/* <Route /> */}
        </NavigationContainer>
      </Root>
    );
  }
}
