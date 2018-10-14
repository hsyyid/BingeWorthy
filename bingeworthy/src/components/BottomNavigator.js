import { createMaterialBottomTabNavigator } from
      'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Feed') {
          iconName = `ios-home`;
        } else if (routeName === 'Post') {
          iconName = `ios-create`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },

      title: '',
    }),
  initialRouteName: 'Feed',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
