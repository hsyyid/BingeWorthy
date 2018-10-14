import React from 'react';
import { StreamApp, FlatFeed, UserCard, Avatar } from 'react-native-activity-feed';
import { View, ScrollView, Text, Platform } from 'react-native';

import {connectSpotify } from '../reducers/user';
import {getUserData} from '../reducers/stream';
import Card from './Card';
import CardSection from './CardSection';

import Header from './Header';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00',
    position: 'relative',
    elevation: 1,
  },
  text: {
    fontSize: 20
  },
  container1: {
    padding: 10
  },
};

class Profile extends React.Component {
    constructor(props) {
        super(props);

          this.state = {
              user: undefined
          };
    }

    componentDidMount() {
        let { screenProps } = this.props;

        if (screenProps.userId) {
            getUserData().then(user => {
                this.setState({["user"]: user});
            });
        }
    }

    renderProfile() {
      const {user} = this.state;

      if (user) {
        return (
              <View style={styles.container}>
                <View style={styles.container1}>
                  <Avatar size={150} source={user.coverImage} />
                </View>
                <View style={styles.container1}>
                  <Text style={styles.text}>{user.name}</Text>
                </View>
                <View style={styles.container1}>
                  <Text style={{fontSize: 13}}>{user.desc}</Text>
                </View>
              </View>
        );
      }
    }

    render() {
      const { user } = this.state;
      const {screenProps} = this.props;

        if (screenProps.userSession) {
            return (
                <View style={{ flex: 1 }}>
                    <Header headerText={user && user.name} />
                    <StreamApp
                        apiKey={'***REMOVED***'}
                        appId={'***REMOVED***'}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                      <ScrollView style={{ flex: 1 }}>
                        {this.renderProfile.bind(this)()}
                          <FlatFeed feedGroup="user" />
                        </ScrollView>
                    </StreamApp>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                  <Header headerText={'Feed'} />
                </View>
            );
        }
    }
}

export default Profile;
