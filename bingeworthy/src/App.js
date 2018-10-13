import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
//import { View } from 'react-native';
import { StreamApp } from 'react-native-activity-feed';

const App = () => (
  <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
    <StreamApp
      apiKey="5rqsbgqvqphs"
      appId="40273"
      token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTNhYjdlNTMtYWJhOC00NzYxLWFmMTQtYWY2OTZlZGNmZTc2In0.i_Xow18RWH-7JRGZ87Zg2yRTQJ28e1NJvZ6LFnj_ZkM"
    />
  </SafeAreaView>
);

export default App;
