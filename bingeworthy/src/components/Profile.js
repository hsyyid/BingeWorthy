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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00',
    padding: 12
  },
  text: {
    fontSize: 20
  },
  container1: {
    padding: 17,
    flexDirection: 'column'
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
                  <Avatar size={100} source={user.profileImage} />
                </View>
                <View style={styles.container1}>
                  <Text style={styles.text}>{user.name}</Text>
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
                        apiKey={process.env.GETSTREAM_KEY}
                        appId={process.env.GETSTREAM_ID}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                        {this.renderProfile.bind(this)()}
                        <FlatFeed feedGroup="user" />
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
