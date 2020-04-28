import {createSlice} from "@reduxjs/toolkit";
import myFirebase from "../../firebase";
import { useFirebase } from 'react-redux-firebase'


const AuthenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        isLoggingIn: false,
        isLoggingOut: false,
        isVerifying: false,
        loginError: false,
        logoutError: false,
        isAuthenticated: false,

        user: {}},


    reducers: {
        isAuthenticated(){

        },
        sign_up_request(state, action){
            state.isSigningUp = true
        },
        signup_success(state, action) {
            const {user} = action.payload
            state.error = null
        },
        signup_error(state, action) {
            const {error_message} = action.payload
            state.error = action.payload

        },
        signin_request(state, action){
            state.isLoggingIn = true
        },
        signin_success(state, action){
            state.user = action.payload
            state.isLoggingIn = false
            state.isAuthenticated = true
            state.siginError = null
        },
        signin_error(state, action){
            const {error} = action.payload
            state.siginError = error
            state.isAuthenticated = false
            state.loginError =true

        },
        logout_request(state, action){
           state.isLoggingOut = true
        },
        logout_success(state, action){
            state.isLoggingOut = false
            state.loginError = false
            state.isLoggedIn = false
        },
        logout_failure(state, action){
            state.isLoggingOut = false
            state.isLoggedIn = false

        },
        resetPassword_success(state, action){
            state.resetPasswordSent = true
            state.resetPassword_error = false

        },
        resetPassword_failure(state, action){
            state.resetPasswordSent = false
            state.resetPassword_error = true
            state.resetPasssword_error_msg = action.payload
        },
        create_user_request(state, action){
            state.isCreatingUser = true
            state.create_user_error = false

        },
        create_user_success(state, action){
            state.isCreatingUser = false
            state.create_user_error = false
        },
        create_user_failure(state, action){
            state.isCreatingUser = false
            state.create_user_error = true
            state.create_user_error_msg = action.payload
        }

    }
})



export const {
    sign_up_request,
    signup_success,
    signup_error,
    signin_request,
    signin_success,
    signin_error,
    logout_request,
    logout_success,
    logout_failure,
    resetPassword_failure,
    resetPassword_success,
    create_user_failure,
    create_user_success,
    create_user_request
} = AuthenticationSlice.actions


export default AuthenticationSlice.reducer


///Thunk is defined sepereatley from the slice as it is asynchorunosly.
//thunk action


//signIn thunk



export const signIn = (email, password) =>  (dispatch, getState, {getFirebase}) => {
    dispatch(signin_request())

    return new Promise((resolve, reject)=>{

        try {
            myFirebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((data) => {
                        if(data.user.emailVerified){
                            dispatch(signin_success(signin_success()));
                            resolve()
                        }else{
                            reject("user is note verified go to email")
                        }

                })
                .catch((error) => {
                    dispatch(signin_error( {error: error.message}))
                    reject(error.message)
                });
        } catch (err) {

            dispatch(signin_error( {error: err.message}))
            reject(err.message)
        }
    })

}


export const signOut = () => async dispatch => {
    try {
        dispatch(logout_request()) //calling action creators
        myFirebase
            .auth()
            .signOut()
            .then(() => {

                dispatch(logout_success())
            })

            .catch(error => {
                dispatch(logout_failure(error))
            })
    }catch (e) {
        dispatch(logout_failure(e))
    }


}


    // Reset password with Firebaseexport const resetPassword = email => async dispatch => {

export const resetPassword = email =>  dispatch => {

    return new Promise((resolve, reject) =>{
        try {
            myFirebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                        dispatch(resetPassword_success());
                        resolve()
                    }
                )
                .catch(err => {
                    dispatch(resetPassword_failure(err));
                    reject(err.message)
                });
        } catch (err) {
            dispatch(resetPassword_failure(err));
            reject(err.message)
        }
    })
};


//////////////////////






export const signUp = (email, password) =>  dispatch => {


  return new Promise((resolve, reject)=>{
        dispatch(sign_up_request())



        try{
            myFirebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(dataBeforeEmail => {
                        myFirebase.auth().onAuthStateChanged(function(user) {
                        user.sendEmailVerification();
                        dispatch(createUserInFirestore(user))
                        });
                })
                .then(dataAfterEmail => {
                    myFirebase.auth().onAuthStateChanged(function(user) {
                        if (user.emailVerified) {
                            dispatch(signup_success())
                            resolve()
                        } else {
                            dispatch(signup_error("User is not verified, go to your email!"))
                            reject("User is not verified, go to your email!")
                        }
                    });
                }).catch(err =>{
                    console.log(typeof(err.message))
                dispatch(signup_error(err.message))
                reject(err.message)
                })
        }catch(err){
            dispatch(signup_error(err.message))
            reject(err.message())
        }
   })
}


export const createUserInFirestore = (user) =>  (dispatch, getState, {getFirebase, getFirestore}) => {



    return new Promise((resolve, reject) =>{
        dispatch(create_user_request());


        try {
            const uid = user.uid;
            const email = user.email

            const firestore = getFirestore()
            firestore.collection('users').doc(uid).set({
                email:email,
                id: uid
            }).then(()=>{
                resolve()
            })
        } catch (err) {
            dispatch(create_user_failure(err))
            reject(err.message)
        }

    });

}


export const checkUser = () => (dispatch, getState, {getFirebase, getFirestore}) =>{

    return new Promise((resolve, reject)=>{
        //dispatch
        try {
            const firebase = getFirebase()
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    resolve("user is defined")
                } else {
                    reject("user is null")
                }
            });


        }catch (err){
            reject(err.message)
        }
    })

}

