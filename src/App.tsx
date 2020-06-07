import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { Component, createContext } from "react";
import { Root, Icon } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/welcomeScreen";
import SetupScreen from "./screens/setupScreen";
import HomeScreen from "./screens/homeScreen";
import EditContactScreen from "./screens/editContactScreen";

const AppStack = createStackNavigator();

interface State {
  initialRender: boolean;
  notFirstTime: boolean;
}

interface Props {}

export const NavigationContext = createContext(null);

export default class Routes extends Component<Props, State> {
  notFirstTime: boolean;
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      initialRender: true,
      notFirstTime: false,
    };
  }

  componentDidMount = async () => {
    const contactDetails = await AsyncStorage.getItem("contactDetails");
    this.setState({
      notFirstTime: Boolean(contactDetails),
      initialRender: false,
    });
  };

  render() {
    const { initialRender, notFirstTime } = this.state;
    if (initialRender) return null;

    return (
      <Root>
        <NavigationContainer>
          <NavigationContext.Provider
            value={{
              isFirstTime: true,
              toggleIsFirstTime: () => {
                this.context = false;
                this.setState({ notFirstTime: true });
              },
            }}
          >
            <AppStack.Navigator headerMode="none">
              {!notFirstTime ? (
                <>
                  <AppStack.Screen
                    name="WelcomeScreen"
                    component={WelcomeScreen}
                  />
                  <AppStack.Screen name="SetupScreen" component={SetupScreen} />
                </>
              ) : (
                <>
                  <AppStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                      header: () => (
                        <Icon
                          name="menu"
                          style={{ marginLeft: 16, marginTop: 16 }}
                        />
                      ),
                    }}
                  />
                  <AppStack.Screen
                    component={EditContactScreen}
                    name="EditContactScreen"
                  />
                </>
              )}
            </AppStack.Navigator>
          </NavigationContext.Provider>
        </NavigationContainer>
      </Root>
    );
  }
}
