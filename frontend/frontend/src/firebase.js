// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import "firebase/firestore";
// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBSqUSvMOydAr4U52AndWDclGOE6r_ogXs",
  authDomain: "footballproject-85cd9.firebaseapp.com",
  databaseURL: "https://footballproject-85cd9.firebaseio.com",
  projectId: "footballproject-85cd9",
  storageBucket: "footballproject-85cd9.appspot.com",
  messagingSenderId: "969347786032",
  appId: "1:969347786032:web:d1a594f091b1b7986b54f5",
  measurementId: "G-9SZB02693K"
};

export {firebaseConfig}
// Initialize Firebase
const myFirebase = firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default myFirebase;

const baseDb = myFirebase.firestore();
export const db = baseDb;

