import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from "./visibilityFilter";
import redditReducers from './reddit'
import {firebaseReducer} from "react-redux-firebase";


export default combineReducers({
    todos,
    visibilityFilter,
    redditReducers,
    firebase: firebaseReducer
})