import {createStore, applyMiddleware} from "redux";

import thunk from "redux-thunk";
import getRootReducer from "./reducers/reducer";
import navReducer from './navigator';

export default store = createStore(
    getRootReducer(navReducer),
    undefined,
    applyMiddleware(thunk)
);
