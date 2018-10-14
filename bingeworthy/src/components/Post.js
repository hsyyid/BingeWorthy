import React from 'react';
import { StreamApp, FlatFeed } from 'react-native-activity-feed';
import { View, Linking, Platform, ScrollView } from 'react-native';
import {getUserData, post} from '../reducers/stream';

import {connectSpotify} from '../reducers/user';
import {getUserSession} from '../reducers/stream';

import Header from './Header';
import Input from './Input';
import Card from './Card';
import Button from './Button';

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          text: '',
          user: undefined
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

    componentWillReceiveProps(nextProps) {
        let {screenProps} = nextProps;

        if (this.props.screenProps !== screenProps && this.props.screenProps.userId !== screenProps.userId) {
            getUserData().then(user => {
                this.setState({["user"]: user});
            });
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

    addFeed() {
        post("sdfs", "listen", "hello", "dsfds");
    }

    redirectSpotify() {
        let url = "https://accounts.spotify.com/en/authorize?client_id=7369dceef41249cbad2949dd567cb358&response_type=code&redirect_uri=bingeworthy://spotify&scope=user-read-playback-state%20user-read-currently-playing%20user-read-email%20user-read-private%20user-follow-read%20user-read-recently-played%20user-top-read";
        Linking.openURL(url)
            .catch(err => console.error('An error occurred', err));
    }

    render() {
      console.log(this.state.text);
        if (this.props.screenProps.userSession) {
            console.log("rendering...");
            return (
                <View style={{flex: 1}}>
                    <Header headerText={'Feed'} />
                    <StreamApp
                        apiKey={'***REMOVED***'}
                        appId={'***REMOVED***'}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                      <Card>
                          <Input placeholder="Text"
                                value={this.state.text}
                                onChangeText={text => this.setState({ text })} />
                          <Button onPress={this.addFeed}>Post</Button>
                        </Card>
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
