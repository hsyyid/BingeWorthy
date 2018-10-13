import React from 'react';

import Provider from 'react-redux';
import {createStore} from 'redux';
import Page from './components/Page';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';
import reducers from './reducers';

import BottomNavigator from './components/BottomNavigator';

Amplify.configure(aws_exports);

const App = () => (
  <Page/>
);

export default withAuthenticator(App);
