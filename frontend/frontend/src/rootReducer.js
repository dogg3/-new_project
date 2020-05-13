import { combineReducers } from '@reduxjs/toolkit'
import playerPivotReducer from './features/playersPivot/playerPivotSlice'
import defenderReducer from './features/player/defenderSlice'
import midfielderReducer from './features/player/midfielderSlice'
import forwardReducer from './features/player/forwardSlice'
import {firebaseReducer} from "react-redux-firebase";
import reducerAuthentication from './views/Auth/FireabaseSlice'
import {firestoreReducer} from "redux-firestore";



import shortListDefenderReducer from "./features/playerShortlist/DefendersShortList/DefendersShortListSlice"
import shortListMidfielderReducer from "./features/playerShortlist/MidfieldersShortList/MidfieldersShortListSlice"
import shortListForwardReducer from "./features/playerShortlist/ForwardsShortList/ForwardsShortListSlice"


const rootReducer = combineReducers({
    auth: reducerAuthentication,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    playersPivot: playerPivotReducer,
    defender: defenderReducer,
    midfielder: midfielderReducer,
    forward: forwardReducer,
    
    defenderShortList: shortListDefenderReducer,
    midfielderShortList: shortListMidfielderReducer,
    forwardShortList: shortListForwardReducer,

});

export default rootReducer