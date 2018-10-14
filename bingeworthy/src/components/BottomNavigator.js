import { createMaterialBottomTabNavigator } from
      'react-navigation-material-bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';

import Feed from './Feed';
import Profile from './Profile';
import Post from './Post';

const labelStyle = {
  fontSize: 17
};

export default createMaterialBottomTabNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: <Text style={labelStyle}>Feed</Text>
    }
  },
  Post: {
    screen: Post,
    navigationOptions: {
      tabBarLabel: <Text style={labelStyle}>Post</Text>
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: <Text style={labelStyle}>Profile</Text>
      }
    },
  }, {
  initialRouteName: 'Feed',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
