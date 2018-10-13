import React from 'react';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

import BottomNavigator from './components/BottomNavigator';

Amplify.configure(aws_exports);

const App = () => (
  <Provider store={createStore(reducers)}>
    <BottomNavigator />
  </Provider>
);

export default withAuthenticator(App);
