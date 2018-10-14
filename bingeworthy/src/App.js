import React, {Component} from 'react';
import {Linking, Platform, View} from 'react-native';

import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

import {connectSpotify, getUser, isSpotifyConnected, getSpotifyCurrentlyPlaying} from './reducers/user';
import {getUserSession} from './reducers/stream';

import BottomNavigator from './components/BottomNavigator';

Amplify.configure(aws_exports);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: undefined,
            userSession: undefined,
            spotifyConnected: true,
            spotifyPlaying: undefined
        };

        this.navigate = this.navigate.bind(this);
    }

    componentWillMount() {
        getUser().then(user => {
            this.setState({["userId"]: user.signInUserSession.accessToken.payload.sub});
        });

        getUserSession().then(session => {
            console.log('GOT SESSION');
            this.setState({["userSession"]: session});
        });

        isSpotifyConnected().then(res => {
            this.setState({["spotifyConnected"]: res.connected});

            if (res.connected) {
                setInterval(() => {
                    getSpotifyCurrentlyPlaying().then((songInfo) => {
                        this.setState({["spotifyPlaying"]: songInfo});
                    });
                }, 1000);
            }
        });
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
        if (url) {
            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];

            let params = this.convertURL(id);

            if (params["?code"] && params["?code"].length && params["?code"].length > 0) {
                connectSpotify(params["?code"]);
            }
        }
    }

    convertURL = (search) => {
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }

    render() {
        return (
            <BottomNavigator screenProps={{
                userId: this.state.userId,
                userSession: this.state.userSession,
                spotifyPlaying: this.state.spotifyPlaying,
                spotifyConnected: this.state.spotifyConnected,
                spotifyPlaying: this.state.spotifyPlaying
            }}
            />
        );
    }
}

export default withAuthenticator(App);
