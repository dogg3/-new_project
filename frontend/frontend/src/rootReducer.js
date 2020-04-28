import { combineReducers } from '@reduxjs/toolkit'
import playerPivotReducer from './features/playersPivot/playerPivotSlice'
import {firebaseReducer} from "react-redux-firebase";
import reducerAuthentication from './views/Auth/FireabaseSlice'
import {firestoreReducer} from "redux-firestore";


const rootReducer = combineReducers({
    playersPivot: playerPivotReducer,
    auth: reducerAuthentication,
    firebase: firebaseReducer,
    firestore: firestoreReducer

})
export default rootReducer