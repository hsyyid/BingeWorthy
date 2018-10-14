import React from 'react';
import {View, Linking, Text, TouchableOpacity} from 'react-native';
import {FlatFeed, StreamApp, Activity, Card} from 'react-native-activity-feed';

import {getUserData} from '../reducers/stream';

import Header from './Header';

const Act = (props) => {
  return (
    <View style={{ borderWidth: 1, borderColor: '#ddd' }}>
      <Activity activity={props.activity} />
      <Card title={props.activity.verb}
            description={props.activity.object}
            image={props.activity.image}
      />
    </View>
  );
};

export default class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    redirectSpotify() {
        let url = "https://accounts.spotify.com/en/authorize?client_id=7369dceef41249cbad2949dd567cb358&response_type=code&redirect_uri=bingeworthy://spotify&scope=user-read-playback-state%20user-read-currently-playing%20user-read-email%20user-read-private%20user-follow-read%20user-read-recently-played%20user-top-read";
        Linking.openURL(url)
            .catch(err => console.error('An error occurred', err));
    }

    render() {
        const {user} = this.state;
        const {screenProps} = this.props;

        if (screenProps.userSession) {
            return (
                <View style={{flex: 1}}>
                    <Header headerText={'BingeWorthy'} fontWeight={'700'}/>
                    {!screenProps.spotifyConnected && <TouchableOpacity onPress={this.redirectSpotify} style={{
                        backgroundColor: "#1db954"
                    }}>
                        <Text style={{color: "#fff"}}>Click to link your Spotify.</Text>
                    </TouchableOpacity>}
                    {screenProps.spotifyConnected && screenProps.spotifyPlaying && screenProps.spotifyPlaying.album &&
                    <Text style={{
                        color: "#fff",
                        backgroundColor: "#1db954"
                    }}>{screenProps.spotifyPlaying.song.name + " - " + screenProps.spotifyPlaying.artists.join(", ")}</Text>}
                    <StreamApp
                        apiKey={'***REMOVED***'}
                        appId={'***REMOVED***'}
                        token={this.props.screenProps.userSession}
                        userId={this.props.screenProps.userId}
                    >
                        <FlatFeed
                            feedGroup={"timeline"}
                            Activity={Act}
                        />
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
