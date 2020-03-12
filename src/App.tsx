import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Root, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './screens/welcomeScreen';
import SetupScreen from './screens/setupScreen';
import HomeScreen from './screens/homeScreen';

const SetupStack = createStackNavigator();
const MainStack = createStackNavigator();

interface State {
  initialRender: boolean;
  notFirstTime: boolean;
}

interface Props {}

export default class Routes extends Component<Props, State> {
  notFirstTime: boolean;

  constructor(props) {
    super(props);
    this.state = {
      initialRender: true,
      notFirstTime: false
    };
  }

  componentDidMount = async () => {
    const contactDetails = await AsyncStorage.getItem('contactDetails');
    this.setState({ notFirstTime: Boolean(contactDetails), initialRender: false });
  };

  render() {
    const { initialRender, notFirstTime } = this.state;
    if (initialRender) return null;

    return (
      <Root>
        <NavigationContainer>
          {!notFirstTime ? (
            <SetupStack.Navigator headerMode='none'>
              <SetupStack.Screen name='WelcomeScreen' component={WelcomeScreen} />
              <SetupStack.Screen name='SetupScreen' component={SetupScreen} />
            </SetupStack.Navigator>
          ) : (
            <MainStack.Navigator>
              <MainStack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  header: () => <Icon name='menu' style={{ marginLeft: 16, marginTop: 16 }} />
                }}
              />
            </MainStack.Navigator>
          )}
        </NavigationContainer>
      </Root>
    );
  }
}
