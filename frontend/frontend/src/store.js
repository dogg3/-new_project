
import {addPlayer} from "./features/playerShortlist/PlayersShortListSlice";
import rootReducer from './rootReducer'
import { logger } from 'redux-logger';
import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'

import {reduxFirestore, getFirestore} from "redux-firestore";
import {reactReduxFirebase, getFirebase} from "react-redux-firebase";
import firebase from "firebase";
import myFirebase from "firebase";

import {firebaseConfig} from "firebase";

// // We'll use redux-logger just as an example of adding another middleware
const middleware = [thunk.withExtraArgument({getFirebase, getFirestore}), logger]


const store = configureStore({
    reducer: rootReducer,
    middleware,
    enhancers: [reduxFirestore(myFirebase)]
})




export default store