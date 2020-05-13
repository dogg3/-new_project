import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    get_defenders_failure,
    get_defenders_loading,
    get_defenders_success,
    shortlist_remove_defender_failure,
    shortlist_remove_defender_loading,
    shortlist_remove_defender_success
} from "../DefendersShortList/DefendersShortListSlice";




const ForwardsShortList = createSlice({
    name:'forwardShortList',
    initialState:{
        short_listed_forwards:[]
    },
    reducers:{
        add_forward_loading(state, action){
            state.add_forward_loading = true
        },
        add_forward_success(state, action){
            state.add_forward_loading = false;
            state.add_forward_success = true;
            state.add_forward_error = false
        },
        add_forward_failure(state,action){
            state.add_forward_error = action.payload;
            state.add_forward_loading = false;
            state.add_forward_success = false
        },


        shortlist_remove_forward_loading(state, action){
            state.shortlist_remove_forward_loading = true
        },
        shortlist_remove_forward_success(state, action){
            state.shortlist_remove_forward_loading = false;
            state.shortlist_remove_forward_success = true;
            state.shortlist_remove_forward_error = false
        },
        shortlist_remove_forward_failure(state,action){
            state.shortlist_remove_forward_error = action.payload;
            state.shortlist_remove_forward_loading = false;
            state.shortlist_remove_forward_success = false
        },


        get_forwards_loading(state,action){
            state.get_forwards_loading = true
        },
        get_forwards_success(state,action){
            state.short_listed_forwards = action.payload;
            state.get_forwards_loading = false;
            state.get_forwards_success =true;
            state.get_forwards_error  = false
        },
        get_forwards_failure(state,action){
            state.get_forwards_error  = action.payload;
            state.get_forwards_loading = false;
            state.get_forwards_success =false
        }
    }
});



export const {
    add_forward_loading,
    add_forward_success,
    add_forward_failure,
    add_forward_error,

    shortlist_remove_forward_loading,
    shortlist_remove_forward_success,
    shortlist_remove_forward_failure,
    shortlist_remove_forward_error,

    get_forwards_loading,
    get_forwards_success,
    get_forwards_failure,

    short_listed_forwards

} = ForwardsShortList.actions;



////THUNKS
////ADDDING
export const shortlist_add_forward = (uid, playerId) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(add_forward_loading());
    const firestore = getFirestore();
    await firestore.collection('users').doc(uid).collection('forwards').doc(playerId).set({
        playerId:playerId,
    },{ merge: true }).then(()=>{
        dispatch(add_forward_success())
    }).catch((e)=>{
        dispatch(add_forward_failure(e))
    })
};



////REMOVING
export const shortlist_remove_forward = (uid, playerId) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(shortlist_remove_forward_loading());
    const firestore = getFirestore();

    return new Promise( (resolve,reject) => {
        firestore.collection('users').doc(uid).collection('forwards').doc(playerId).delete()
            .then(()=>{
                dispatch(shortlist_remove_forward_success());
                resolve()
            }).catch((e)=>{
            dispatch(shortlist_remove_forward_failure(e));
            reject()
        })

    })
};




const API_FORWARDS_OVERALL = 'http://35.246.111.237/api/forwards/overall';

export const shortlist_get_forwards = (uid, full_objects) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(get_forwards_loading());
    const firestore = getFirestore();
    let shortlist = [];
    return new Promise( (resolve,reject) => {
        firestore.collection('users').doc(uid).collection('forwards')
            .get()
            .then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    shortlist.push(doc.id)
                });
                if (!full_objects) {
                    dispatch(get_forwards_success(shortlist))
                }
            }).then(async () => {
            if (full_objects) {
                await axios.get(API_FORWARDS_OVERALL)
                    .then((forwards) => {
                        //Just the players from the shortlist
                        Object.entries(forwards.data).map((v) => {
                            if (shortlist.includes(v[0].toString())) {
                                shortlist[shortlist.indexOf(v[0].toString())] = v

                            }
                        });

                        dispatch(get_forwards_success(shortlist));
                        resolve()
                    }).catch((err) => {
                        dispatch(get_forwards_failure(err.message));
                        reject()
                    })
            }
        }).then(() => {
            dispatch(get_forwards_success(shortlist));
            resolve()
        })
            .catch(e => {
                dispatch(get_forwards_failure(e));
                reject()
            })


    })
};





export default ForwardsShortList.reducer