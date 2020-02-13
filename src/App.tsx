import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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

const Routes = createAppContainer(SetupStack);

export default Routes;
