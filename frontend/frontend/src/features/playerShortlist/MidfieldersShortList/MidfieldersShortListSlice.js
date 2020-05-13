import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    get_forwards_failure,
    get_forwards_loading,
    get_forwards_success
} from "../ForwardsShortList/ForwardsShortListSlice";
import {
    get_defenders_failure,
    get_defenders_loading,
    get_defenders_success,
    shortlist_remove_defender_failure,
    shortlist_remove_defender_loading,
    shortlist_remove_defender_success
} from "../DefendersShortList/DefendersShortListSlice";




const MidfieldersShortList = createSlice({
    name:'midfielderShortList',
    initialState:{
        short_listed_midfielders:[]
    },
    reducers:{
        add_midfielder_loading(state, action){
            state.add_midfielder_loading = true
        },
        add_midfielder_success(state, action){
            state.add_midfielder_loading = false;
            state.add_midfielder_success = true;
            state.add_midfielder_error = false
        },
        add_midfielder_failure(state,action){
            state.add_midfielder_error = action.payload;
            state.add_midfielder_loading = false;
            state.add_midfielder_success = false
        },


        shortlist_remove_midfielder_loading(state, action){
            state.shortlist_remove_midfielder_loading = true
        },
        shortlist_remove_midfielder_success(state, action){
            state.shortlist_remove_midfielder_loading = false;
            state.shortlist_remove_midfielder_success = true;
            state.shortlist_remove_midfielder_error = false
        },
        shortlist_remove_midfielder_failure(state,action){
            state.shortlist_remove_midfielder_error = action.payload;
            state.shortlist_remove_midfielder_loading = false;
            state.shortlist_remove_midfielder_success = false
        },


        get_midfielders_loading(state,action){
            state.get_midfielders_loading = true
        },
        get_midfielders_success(state,action){
            state.short_listed_midfielders = action.payload;
            state.get_midfielders_loading = false;
            state.get_midfielders_success =true;
            state.get_midfielders_error  = false
        },
        get_midfielders_failure(state,action){
            state.get_midfielders_error  = action.payload;
            state.get_midfielders_loading = false;
            state.get_midfielders_success =false
        }
    }
});



export const {
    add_midfielder_loading,
    add_midfielder_success,
    add_midfielder_failure,
    add_midfielder_error,

    shortlist_remove_midfielder_loading,
    shortlist_remove_midfielder_success,
    shortlist_remove_midfielder_failure,
    shortlist_remove_midfielder_error,

    get_midfielders_loading,
    get_midfielders_success,
    get_midfielders_failure,

    short_listed_midfielders

} = MidfieldersShortList.actions;



////THUNKS
////ADDDING
export const shortlist_add_midfielder = (uid, playerId) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(add_midfielder_loading());
    const firestore = getFirestore();
    await firestore.collection('users').doc(uid).collection('midfielders').doc(playerId).set({
        playerId:playerId,
    },{ merge: true }).then(()=>{
        dispatch(add_midfielder_success())
    }).catch((e)=>{
        dispatch(add_midfielder_failure(e))

    })
};




////REMOVING
export const shortlist_remove_midfielder = (uid, playerId) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {

    //console.log()(playerId)
    dispatch(shortlist_remove_midfielder_loading());
    const firestore = getFirestore();

    return new Promise( (resolve,reject) => {
        firestore.collection('users').doc(uid).collection('midfielders').doc(playerId).delete()
            .then(()=>{
                dispatch(shortlist_remove_midfielder_success());
                resolve()
            }).catch((e)=>{
            dispatch(shortlist_remove_midfielder_failure(e));
            reject(e)
        })

    })
};







const API_MIDFIELDERS_OVERALL = 'http://35.246.111.237/api/midfielders/overall';

export const shortlist_get_midfielders = (uid, full_objects) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(get_midfielders_loading());
    const firestore = getFirestore();
    let shortlist = [];

    return new Promise( (resolve,reject) => {
        firestore.collection('users').doc(uid).collection('midfielders')
            .get()
            .then(function (querySnapshot) {
                //console.log()('first then')
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    shortlist.push(doc.id)
                });
                if (!full_objects) {
                    dispatch(get_midfielders_success(shortlist))
                }
            }).then(async () => {
            //console.log()('second then')
            if (full_objects) {
                await axios.get(API_MIDFIELDERS_OVERALL)
                    .then((midfielders) => {
                        //console.log()('third then')
                        //Just the players from the shortlist
                        Object.entries(midfielders.data).map((v) => {
                            if (shortlist.includes(v[0].toString())) {
                                shortlist[shortlist.indexOf(v[0].toString())] = v

                            }
                        });

                        dispatch(get_midfielders_success(shortlist));
                        resolve()
                    }).catch((err) => {
                        dispatch(get_midfielders_failure(err.message));
                        reject()
                    })
            }
        }).then(() => {
            dispatch(get_midfielders_success(shortlist));
            resolve()
        })
            .catch(e => {
                dispatch(get_midfielders_failure(e));
                reject()
            })


    })
};






export default MidfieldersShortList.reducer