import React from 'react';
import { StreamApp, FlatFeed } from 'react-native-activity-feed';
import { View, Linking, Platform, ScrollView } from 'react-native';

import {connectSpotify} from '../reducers/user';
import {getUserSession} from '../reducers/stream';

import Header from './Header';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            userId: undefined,
            userSession: undefined
        };
        */
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }

    navigate = (url) => {
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];

        let params = this.convertURL(id);
        connectSpotify(params["?code"]);
    }

    convertURL = (search) => {
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }


    redirectSpotify() {
        let url = "https://accounts.spotify.com/en/authorize?client_id=7369dceef41249cbad2949dd567cb358&response_type=code&redirect_uri=bingeworthy://spotify&scope=user-read-playback-state%20user-read-currently-playing%20user-read-email%20user-read-private%20user-follow-read%20user-read-recently-played%20user-top-read";
        Linking.openURL(url)
            .catch(err => console.error('An error occurred', err));
    }

    render() {
        if (this.props.screenProps.userSession) {
            console.log("rendering...");
            console.log(this.props.screenProps.userSession);
            return (
                <View style={{flex: 1}}>
                    <Header headerText={'Feed'} />
                    <StreamApp
                        apiKey={'***REMOVED***'}
                        appId={'***REMOVED***'}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                        <ScrollView style={{ flex: 1 }}>
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
