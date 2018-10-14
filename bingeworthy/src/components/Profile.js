import React from 'react';
import {StreamApp, FlatFeed} from 'react-native-activity-feed';
import {View, Linking, Platform, ScrollView} from 'react-native';

import {connectSpotify} from '../reducers/user';
import {getUserSession} from '../reducers/stream';

import Header from './Header';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header headerText={'Feed'}/>
            </View>
        );
    }
}
