import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './store'
import myFirebase from "./firebase";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
    firebase: myFirebase,
    config: rrfConfig,
    dispatch: store.dispatch,
  //  createFirestoreInstance: true // <- needed if using firestore
};



// Setup react-redux so that connect HOC can be used
ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider  {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>

    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
