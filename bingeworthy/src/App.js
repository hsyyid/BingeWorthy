import React from 'react';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

import { Page } from './components';

Amplify.configure(aws_exports);

const App = () => (
    <Page />
);

export default withAuthenticator(App);
