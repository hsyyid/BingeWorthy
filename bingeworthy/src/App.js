import React from 'react';
import { View } from 'react-native';

import Provider from 'react-redux';
import { createStore } from 'redux';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';
import reducers from './reducers';
import { getUser } from './reducers/user';
import { getUserSession } from './reducers/stream';

import BottomNavigator from './components/BottomNavigator';

Amplify.configure(aws_exports);

class App extends React.Component {
  state = {
      userId: undefined,
      userSession: undefined
  };

  componentWillMount() {
    getUser().then(user => {
        this.setState({ ["userId"]: user.signInUserSession.accessToken.payload.sub });
    });

    getUserSession().then(session => {
        console.log('GOT SESSION');
        this.setState({ ["userSession"]: session });
    });
    //console.log(this.state);
  }

  render() {
    return (
      //<Provider store={createStore(reducers)}>
        <BottomNavigator screenProps={{ userId: this.state.userId,
                         userSession: this.state.userSession }}
        />
      //</Provider>
    );
  }
}

export default App;
