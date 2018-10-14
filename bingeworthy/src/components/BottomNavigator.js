import { createMaterialBottomTabNavigator } from
      'react-navigation-material-bottom-tabs';
import Feed from './Feed';

export default createMaterialBottomTabNavigator({
  Profile: { screen: Feed },
  Feed: { screen: Feed },
  Post: { screen: Feed },
}, {
  initialRouteName: 'Feed',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
