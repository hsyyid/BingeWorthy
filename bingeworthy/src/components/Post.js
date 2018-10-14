import React from 'react';
import {StreamApp, FlatFeed} from 'react-native-activity-feed';
import {View, Linking, Platform, ScrollView} from 'react-native';
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
    }

    componentWillReceiveProps(nextProps) {
        let {screenProps} = nextProps;

        if (this.props.screenProps !== screenProps && this.props.screenProps.userId !== screenProps.userId) {
            getUserData().then(user => {
                this.setState({["user"]: user});
            });
        }
    }

    addFeed() {
        const {screenProps} = this.props.screenProps;

        post("listen", screenProps && screenProps.spotifyPlaying
            ? screenProps.spotifyPlaying.song.name + " - " + screenProps.spotifyPlaying.artists.join(", ")
            : "", this.state.text, screenProps && screenProps.spotifyPlaying && screenProps.spotifyPlaying.album && screenProps.spotifyPlaying.album.images ? screenProps.spotifyPlaying.album.images[0].url : undefined);
    }

    render() {
        console.log(this.state.text);
        if (this.props.screenProps.userSession) {
            console.log("rendering...");
            return (
                <View style={{flex: 1}}>
                    <Header headerText={'Feed'}/>
                    <StreamApp
                        apiKey={'***REMOVED***'}
                        appId={'***REMOVED***'}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                        <Card>
                            <Input placeholder="Text"
                                   value={this.state.text}
                                   onChangeText={text => this.setState({text})}/>
                            <Button onPress={this.addFeed.bind(this)}>Post to Feed</Button>
                        </Card>
                    </StreamApp>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <Header headerText={'Feed'}/>
                </View>
            );
        }
    }
}
