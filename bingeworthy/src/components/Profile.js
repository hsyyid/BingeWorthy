import React from 'react';
import { View } from 'react-native';
import { StreamApp, FlatFeed } from 'react-native-activity-feed';
//import { ShiftingTab } from 'react-native-material-bottom-navigation';
import Header from './Header';

class Profile extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'Feeds'} />
        <StreamApp
          apiKey="5rqsbgqvqphs"
          appId="40273"
          token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTNhYjdlNTMtYWJhOC00NzYxLWFmMTQtYWY2OTZlZGNmZTc2In0.i_Xow18RWH-7JRGZ87Zg2yRTQJ28e1NJvZ6LFnj_ZkM"
        />
      </View>
    );
  }
}

export default Profile;
