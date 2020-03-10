import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Root } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/welcomeScreen';
import SetupScreen from './screens/setupScreen';
import HomeScreen from './screens/homeScreen';

const SetupStack = createStackNavigator();
const MainStack = createStackNavigator();

interface State {
  initialRender: boolean;
  firstTimer: boolean;
}

interface Props {}

export default class Routes extends Component<Props, State> {
  firstTimer: boolean;

  constructor(props) {
    super(props);
    this.state = {
      initialRender: true,
      firstTimer: false
    };
  }

  componentDidMount = async () => {
    const contactDetails = await AsyncStorage.getItem('contactDetails');
    this.setState({ firstTimer: Boolean(contactDetails), initialRender: false });
    console.warn(Boolean(contactDetails));
  };

  render() {
    const { initialRender, firstTimer } = this.state;
    if (initialRender) return null;

    return (
      <Root>
        <NavigationContainer>
          {!firstTimer ? (
            <SetupStack.Navigator headerMode='none'>
              <SetupStack.Screen name='WelcomeScreen' component={WelcomeScreen} />
              <SetupStack.Screen name='SetupScreen' component={SetupScreen} />
            </SetupStack.Navigator>
          ) : (
            <MainStack.Navigator>
              <MainStack.Screen name='HomeScreen' component={HomeScreen} />
            </MainStack.Navigator>
          )}
        </NavigationContainer>
      </Root>
    );
  }
}
