import { combineReducers } from 'redux';
import { user } from './user';
import pageReducer from './pageReducer';
//import { navReducer } from './navReducer';

export default combineReducers({ selectedPage: pageReducer });
