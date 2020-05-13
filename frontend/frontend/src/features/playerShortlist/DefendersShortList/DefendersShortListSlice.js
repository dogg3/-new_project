import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {defenders_failure, defenders_success} from "../../playersPivot/playerPivotSlice";




const DefendersShortList = createSlice({
    name:'defenderShortList',
    initialState:{
        short_listed_defenders:[]
    },
    reducers:{
        add_defender_loading(state, action){
            state.add_defender_loading = true
        },
        add_defender_success(state, action){
            state.add_defender_loading = false;
            state.add_defender_success = true;
            state.add_defender_error = false
        },
        add_defender_failure(state,action){
            state.add_defender_error = action.payload;
            state.add_defender_loading = false;
            state.add_defender_success = false
        },
        
        
        shortlist_remove_defender_loading(state, action){
            state.shortlist_remove_defender_loading = true
        },
        shortlist_remove_defender_success(state, action){
            state.shortlist_remove_defender_loading = false;
            state.shortlist_remove_defender_success = true;
            state.shortlist_remove_defender_error = false
        },
        shortlist_remove_defender_failure(state,action){
            state.shortlist_remove_defender_error = action.payload;
            state.shortlist_remove_defender_loading = false;
            state.shortlist_remove_defender_success = false
        },


        get_defenders_loading(state,action){
            state.get_defenders_loading = true
        },
        get_defenders_success(state,action){
            state.short_listed_defenders = action.payload;
            state.get_defenders_loading = false;
            state.get_defenders_success =true;
            state.get_defenders_error  = false
        },
        get_defenders_failure(state,action){
            state.get_defenders_error  = action.payload;
            state.get_defenders_loading = false;
            state.get_defenders_success =false
        }
    }
});



export const {
    add_defender_loading,
    add_defender_success,
    add_defender_failure,
    add_defender_error,

    shortlist_remove_defender_loading,
    shortlist_remove_defender_success,
    shortlist_remove_defender_failure,
    shortlist_remove_defender_error,

    get_defenders_loading,
    get_defenders_success,
    get_defenders_failure,

    short_listed_defenders
    
} = DefendersShortList.actions;



////THUNKS
////ADDDING
export const shortlist_add_defender = (uid, playerId) =>   (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(add_defender_loading());
    const firestore = getFirestore();
    return new Promise( (resolve,reject) => {
        firestore.collection('users').doc(uid).collection('defenders').doc(playerId).set({
            playerId: playerId,
        }, {merge: true}).then(() => {
            dispatch(add_defender_success(playerId));
            resolve(playerId)
        }).catch((e) => {
            dispatch(add_defender_failure(e));
            reject()
        })
    })
};

///REMOVE
////REMOVING
export const shortlist_remove_defender = (uid, playerId) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(shortlist_remove_defender_loading());
    const firestore = getFirestore();

    return new Promise( (resolve,reject) => {
        firestore.collection('users').doc(uid).collection('defenders').doc(playerId).delete()
            .then(()=>{
            dispatch(shortlist_remove_defender_success());
            resolve()
        }).catch((e)=>{
            dispatch(shortlist_remove_defender_failure(e));
            reject()
        })

    })
};





////GET_SHORTLIST



const API_DEFENDERS_OVERALL = 'http://35.246.111.237/api/defenders/overall';

export const shortlist_get_defenders = (uid, full_objects) =>  async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(get_defenders_loading());
    const firestore = getFirestore();
    let shortlist = [];

  return new Promise( (resolve,reject) => {
      firestore.collection('users').doc(uid).collection('defenders')
          .get()
          .then(function (querySnapshot) {

              querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  shortlist.push(doc.id)
              });
              if (!full_objects) {
                  dispatch(get_defenders_success(shortlist));
                  resolve()
              }
          }).then(async () => {

          if (full_objects) {
              await axios.get(API_DEFENDERS_OVERALL)
                  .then((defenders) => {
                      //console.log()('third then')
                      //Just the players from the shortlist
                      Object.entries(defenders.data).map((v) => {
                          if (shortlist.includes(v[0].toString())) {
                              shortlist[shortlist.indexOf(v[0].toString())] = v

                          }
                      });

                      dispatch(get_defenders_success(shortlist));
                      //console.log()('here in real')
                      resolve()
                  }).catch((err) => {
                      dispatch(get_defenders_failure(err.message));
                      reject()
                  })
          }
      }).then(() => {
          dispatch(get_defenders_success(shortlist));
          resolve()
      })
          .catch(e => {
              dispatch(get_defenders_failure(e));
              reject()
          })


  })
};





export default DefendersShortList.reducer