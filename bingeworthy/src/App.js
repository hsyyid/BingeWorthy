import React from 'react';
//SafeAreaView is a View which stops screen overflow
//only works with ios11 -
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Amplify, { withAuthenticator } from 'aws-amplify-react-native';
import reducers from './reducers';
import aws_exports from './aws-exports';

import BottomNavigator from './components/BottomNavigator';

Amplify.configure(aws_exports);

const App = () => (
  <Provider store={createStore(reducers)}>
    <BottomNavigator />
  </Provider>
);
export default withAuthenticator(App);
