import React from 'react';
import { View } from 'react-native';
import { StreamApp, FlatFeed } from 'react-native-activity-feed';
import { Header } from '.';

class Page extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'BingeWorthy'} />
        <StreamApp
          apiKey="5rqsbgqvqphs"
          appId="40273"
          token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTNhYjdlNTMtYWJhOC00NzYxLWFmMTQtYWY2OTZlZGNmZTc2In0.i_Xow18RWH-7JRGZ87Zg2yRTQJ28e1NJvZ6LFnj_ZkM"
        >
          <FlatFeed />
        </StreamApp>
      </View>
    );
  }
}

export { Page };
