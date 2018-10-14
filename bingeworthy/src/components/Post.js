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
        const {spotifyPlaying} = this.props.screenProps;
        let song = spotifyPlaying && spotifyPlaying.song
            ? spotifyPlaying.song.name + " - " + spotifyPlaying.artists.join(", ")
            : "NaN";

        let image = spotifyPlaying && spotifyPlaying.album && spotifyPlaying.album.images
            ? spotifyPlaying.album.images[0].url
            : "no image";

        post("Listen", song, this.state.text, image, spotifyPlaying.url);

        this.setState({text: ''})
    }

    render() {
        console.log(this.state.text);
        if (this.props.screenProps.userSession) {
            console.log("rendering...");
            return (
                <View style={{flex: 1}}>
                    <Header headerText={'My Music'}/>
                    <StreamApp
                        apiKey={'***REMOVED***'}
                        appId={'***REMOVED***'}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                        <Card>
                            <Input placeholder="Write something..."
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
