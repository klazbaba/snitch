import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const SetupStack = createStackNavigator(
  {
    SetUpScreen: {
      getScreen: () => require('./screens/setupScreen').default
    }
  },
  {
    headerMode: 'none'
  }
);

const Routes = createAppContainer(SetupStack);

export default Routes;
