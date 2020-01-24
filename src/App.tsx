import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const SetupStack = createStackNavigator({
  SetUpScreen: {
    getScreen: () => require('./screens/setupScreen').default
  }
});

const Routes = createAppContainer(SetupStack);

export default Routes