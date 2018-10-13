import { combineReducers } from "redux";
import {reducer as user} from './user';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        user
    });
}
