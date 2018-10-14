import { createMaterialBottomTabNavigator } from
      'react-navigation-material-bottom-tabs';
import React from 'react';
import { Text } from 'react-native';

import Feed from './Feed';

const labelStyle = {
  fontSize: 17
};

export default createMaterialBottomTabNavigator({
  Profile: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: <Text style={labelStyle}>Profile</Text>
      }
    },
  Feed: { screen: Feed,
    navigationOptions: {
      tabBarLabel: <Text style={labelStyle}>Feed</Text>
    }
  },
  Post: { screen: Feed,
    navigationOptions: {
      tabBarLabel: <Text style={labelStyle}>Post</Text>
    }
  }
  }, {
  initialRouteName: 'Feed',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
