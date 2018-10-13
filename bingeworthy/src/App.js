import React from 'react';
//SafeAreaView is a View which stops screen overflow
//only works with ios11 -
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import { Page } from './components';
//<Provider store={createStore(reducers)}>
const App = () => (
    <Page />
);
//</Provider>
export default App;
