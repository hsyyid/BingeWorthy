import React from 'react';
import {View, Linking, Platform, Text, TouchableOpacity} from 'react-native';
import {connectSpotify, getUser} from '../reducers/user';

import {StreamApp, FlatFeed} from 'react-native-activity-feed';
import {Header} from '.';

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            link: undefined
        };

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
        const {link} = this.state;

        return (
            <View style={{flex: 1}}>
                <Header headerText={'BingeWorthy'}/>

                <TouchableOpacity onPress={this.redirectSpotify}>
                    <Text>
                        HAPPY
                    </Text>
                </TouchableOpacity>

                {link && <Text>{JSON.stringify(link, null, 2)}</Text>}

                <StreamApp
                    apiKey="5rqsbgqvqphs"
                    appId="40273"
                    token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTNhYjdlNTMtYWJhOC00NzYxLWFmMTQtYWY2OTZlZGNmZTc2In0.i_Xow18RWH-7JRGZ87Zg2yRTQJ28e1NJvZ6LFnj_ZkM"
                >
                    <FlatFeed/>
                </StreamApp>
            </View>
        );
    }
}

export {Page};
