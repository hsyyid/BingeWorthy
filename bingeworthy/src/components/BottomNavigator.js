import { createMaterialBottomTabNavigator } from
      'react-navigation-material-bottom-tabs';
import Page from './Page';

export default createMaterialBottomTabNavigator({
  Profile: { screen: Page },
  Feed: { screen: Page },
  Post: { screen: Page },
}, {
  initialRouteName: 'Feed',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
