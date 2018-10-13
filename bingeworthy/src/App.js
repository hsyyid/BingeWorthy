import React from 'react';
//SafeAreaView is a View which stops screen overflow
//only works with ios11 -
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Amplify, { withAuthenticator } from 'aws-amplify-react-native';
import reducers from './reducers';
import aws_exports from './aws-exports';

import { Page } from './components';

Amplify.configure(aws_exports);

//<Provider store={createStore(reducers)}>
const App = () => (
    <Page />
);
//</Provider>
export default withAuthenticator(App);
