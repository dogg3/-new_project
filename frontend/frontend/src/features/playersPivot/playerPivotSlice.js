import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

const playersPivotSlice = createSlice({
    name: 'playersPivot',
    initialState:{
        defenders_loading: false,
    },
    reducers:{


        //OVEARLL
        //DEFENDERS
        set_currentPlayer(state,action){
            state.current_player_id = action.payload
        },

        set_current_position(state,action){
            state.current_position = action.payload
        },
        loading_defenders(state,action){
            state.defenders_loading = true
        },
        defenders_success(state, action){
            state.defenders = action.payload;
            state.defenders_loading =false;
            state.defenders_error = false
        },
       defenders_failure(state,action){
            state.defenders_error = action.payload;
            state.defenders_loading = false
        },

        
        ///MIDFIELDERS
        
        loading_midfielders(state,action){
            state.midfielders_loading = true
        },
        midfielders_success(state, action){
            state.midfielders = action.payload;
            state.midfielders_loading =false;
            state.midfielders_error = false
        },
        midfielders_failure(state,action){
            state.midfielders_error = action.payload;
            state.midfielders_loading = false
        },

        //FORWARDS

        loading_forwards(state,action){
            state.forwards_loading = true
        },
        forwards_success(state, action){
            state.forwards = action.payload;
            state.forwards_loading =false;
            state.forwards_error = false
        },
        forwards_failure(state,action){
            state.forwards_error = action.payload;
            state.forwards_loading = false
        },



        ///STATISITICS

        loading_statistics_defenders(state,action){
            state.loading_statistics_defenders = true
        },
        loading_statistics_midfielders(state,action){
            state.loading_statistics_midfielders = true
        },
        loading_statistics_forwards(state,action){
            state.loading_statistics_forwards = true
        },

        success_statistics_defenders(state,action){
            state.statistics_defenders = action.payload;
            state.loading_statistics_defenders =false;
            state.statistics_defenders_error = false
        },
        success_statistics_midfielders(state,action){
            state.statistics_midfielders = action.payload;
            state.loading_statistics_midfielders =false;
            state.statistics_midfielders_error = false
        },
        success_statistics_forwards(state,action){
            state.statistics_forwards = action.payload;
            state.loading_statistics_forwards =false;
            state.statistics_forwards_error = false
        },


        failure_statistics_defenders(state,action){
            state.statistics_defenders_error = action.payload;
            state.statistics_defenders_loading = false
        },
        failure_statistics_midfielders(state,action){
            state.statistics_midfielders_error = action.payload;
            state.statistics_midfielders_loading = false
        },
        failure_statistics_forwards(state,action){
            state.statistics_forwards_error = action.payload;
            state.statistics_forwards_loading = false
        },



    }
});


///actions
export const {
    set_currentPlayer,
    set_current_position,


    //OVERALL
    loading_defenders,
    defenders_success,
    defenders_failure,
    defenders_error,

    loading_midfielders,
    midfielders_success,
    midfielders_failure,
    midfielders_error,

    loading_forwards,
    forwards_success,
    forwards_failure,
    forwards_error,


    loading_statistics_defenders,
    success_statistics_defenders,
    failure_statistics_defenders,

    loading_statistics_midfielders,
    success_statistics_midfielders,
    failure_statistics_midfielders,

    loading_statistics_forwards,
    success_statistics_forwards,
    failure_statistics_forwards,
    
    } = playersPivotSlice.actions;

/////THUNK ASYNCHRONOUS //////

const API_DEFENDERS_OVERALL = 'http://35.246.111.237/api/defenders/overall';
const API_MIDFIELDERS_OVERALL = 'http://35.246.111.237/api/midfielders/overall';
const API_FORWARDS_OVERALL = 'http://35.246.111.237/api/forwards/overall';


export const fetch_defenders_overall = () =>  async (dispatch) => {
    dispatch(loading_defenders());

    return new Promise( (resolve,reject) => {
            axios.get(API_DEFENDERS_OVERALL)
            .then((defenders) => {
                dispatch(defenders_success(defenders.data));
                resolve()
            }).catch((err) => {
                dispatch(defenders_failure(err.message));
                reject(err)
            })
    })
};

export const fetch_midfielders_overall = () =>  async (dispatch) => {
    dispatch(loading_midfielders());

    return new Promise( (resolve,reject) => {
         axios.get(API_MIDFIELDERS_OVERALL)
            .then((midfielders) => {
                dispatch(midfielders_success(midfielders.data));
                resolve()
            }).catch((err) => {
                dispatch(midfielders_failure(err.message));
                reject(err)
            })
    })
};


export const fetch_forwards_overall = () =>  async (dispatch) => {
    dispatch(loading_forwards());
    return new Promise( (resolve,reject) => {
        axios.get(API_FORWARDS_OVERALL)
            .then((forwards) => {
                dispatch(forwards_success(forwards.data));
                resolve()
            }).catch((err) => {
            dispatch(forwards_failure(err.message));
            reject()
        })
    })
};

//STATS
const API_DEFENDERS_STATS = 'http://35.246.111.237/api/defenders/stats';
const API_MIDFIELDERS_STATS = 'http://35.246.111.237/api/midfielders/stats';
const API_FORWARDS_STATS = 'http://35.246.111.237/api/forwards/stats';

export const fetch_stats_defenders = () =>  (dispatch) =>{
    dispatch(loading_statistics_defenders());

    return new Promise((resolve,reject) =>{

        axios.get(API_DEFENDERS_STATS)
            .then((defender_stats)=>{
                dispatch(success_statistics_defenders(defender_stats.data));
                resolve()
            }).catch(err =>{
            dispatch(failure_statistics_defenders(err.message));
            reject(err)
        })
    })
};

export const fetch_stats_midfielders = () =>  (dispatch) =>{
    dispatch(loading_statistics_midfielders());

    return new Promise((resolve,reject) =>{

        axios.get(API_MIDFIELDERS_STATS)
            .then((defender_stats)=>{
                dispatch(success_statistics_midfielders(defender_stats.data));
                resolve()
            }).catch(err =>{
            dispatch(failure_statistics_midfielders(err.message));
            reject(err)
        })
    })
};

export const fetch_stats_forwards = () =>  (dispatch) =>{
    dispatch(loading_statistics_forwards());

    return new Promise((resolve,reject) =>{

        axios.get(API_FORWARDS_STATS)
            .then((defender_stats)=>{
                dispatch(success_statistics_forwards(defender_stats.data));
                resolve()
            }).catch(err =>{
            dispatch(failure_statistics_forwards(err.message));
            reject(err)
        })
    })
};

///the reducers
export default playersPivotSlice.reducer