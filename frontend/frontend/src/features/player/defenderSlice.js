import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios'



const defenderSlicer = createSlice({
    name: 'defender',
    initialState:{
        player: null,
        loading_error: false
    },
    reducers:{
        set_player_id(state,action){
            state.player_id = action.payload
        },

        //PLAYER INFO
        loading_player_info(state,action){
            state.player_info_loading=true
        },
        loading_player_info_success(state, action){
            state.player_info = action.payload;
            state.player_info_loading =false;
            state.player_info_loading_error = false
        },
        loading_player_info_failure(state,action) {
            state.player_info_loading_error = action.payload;
            state.player_info_loading = false
        },

        //DUELS
        loading_duels_info(state,action){
            state.duels_info_loading=true
        },
        loading_duels_info_success(state, action){
            state.duels_info = action.payload;
            state.duels_info_loading =false;
            state.duels_info_loading_error = false
        } ,
        loading_duels_info_failure(state,action) {
            state.duels_info_loading_error = action.payload;
            state.duels_info_loading = false
        },
        loading_duels_analytics(state,action){
            state.duels_analytics_loading=true
        },
        loading_duels_analytics_success(state, action){
            state.duels_analytics = action.payload;
            state.duels_analytics_loading =false;
            state.duels_analytics_loading_error = false
        } ,
        loading_duels_analytics_failure(state,action) {
            state.duels_analytics_loading_error = action.payload;
            state.duels_analytics_loading = false
        },
        
        
        //PASSES

        loading_passes_info(state,action){
            state.passes_info_loading=true
        },
        loading_passes_info_success(state, action){
            state.passes_info = action.payload;
            state.passes_info_loading =false;
            state.passes_info_loading_error = false
        } ,
        loading_passes_info_failure(state,action) {
            state.passes_info_loading_error = action.payload;
            state.passes_info_loading = false
        },
        loading_passes_analytics(state,action){
            state.passes_analytics_loading=true
        },
        loading_passes_analytics_success(state, action){
            state.passes_analytics = action.payload;
            state.passes_analytics_loading =false;
            state.passes_analytics_loading_error = false
        } ,
        loading_passes_analytics_failure(state,action) {
            state.passes_analytics_loading_error = action.payload;
            state.passes_analytics_loading = false
        },



        //SHOTS

        loading_shots_info(state,action){
            state.shots_info_loading=true
        },
        loading_shots_info_success(state, action){
            state.shots_info = action.payload;
            state.shots_info_loading =false;
            state.shots_info_loading_error = false
        } ,
        loading_shots_info_failure(state,action) {
            state.shots_info_loading_error = action.payload;
            state.shots_info_loading = false
        },
        loading_shots_analytics(state,action){
            state.shots_analytics_loading=true
        },
        loading_shots_analytics_success(state, action){
            state.shots_analytics = action.payload;
            state.shots_analytics_loading =false;
            state.shots_analytics_loading_error = false
        } ,
        loading_shots_analytics_failure(state,action) {
            state.shots_analytics_loading_error = action.payload;
            state.shots_analytics_loading = false
        },

        
        //MATCHES
        loading_matches(state,action){
            state.matches_loading=true
        },
        loading_matches_success(state, action){
            state.matches = action.payload;
            state.matches_loading =false;
            state.matches_loading_error = false
        } ,
        loading_matches_failure(state,action) {
            state.matches_loading_error = action.payload;
            state.matches_loading = false
        },


        //RANKINGS
        loading_rankings(state,action){
            state.rankings_loading=true
        },
        loading_rankings_success(state, action){
            state.rankings = action.payload;
            state.rankings_loading =false;
            state.rankings_loading_error = false
        } ,
        loading_rankings_failure(state,action) {
            state.rankings_loading_error = action.payload;
            state.rankings_loading = false
        },




        
        ///STATS
        
        loading_duels_stats(state,action){
            state.duel_stats_loading= true
        },
        loading_duels_stats_success(state, action){
            state.duels_stats = action.payload;
            state.duels_stats_loading =false;
            state.duels_stats_loading_error = false
        } ,
        loading_duels_stats_failure(state,action) {
            state.duels_stats_loading_error = action.payload;
            state.duels_stats_loading = false
        },

        loading_passes_stats(state,action){
            state.duel_stats_loading= true
        },
        loading_passes_stats_success(state, action){
            state.passes_stats = action.payload;
            state.passes_stats_loading =false;
            state.passes_stats_loading_error = false
        } ,
        loading_passes_stats_failure(state,action) {
            state.passes_stats_loading_error = action.payload;
            state.passes_stats_loading = false
        },

        loading_rankings_stats(state,action){
            state.duel_stats_loading= true
        },
        loading_rankings_stats_success(state, action){
            state.rankings_stats = action.payload;
            state.rankings_stats_loading =false;
            state.rankings_stats_loading_error = false
        } ,
        loading_rankings_stats_failure(state,action) {
            state.rankings_stats_loading_error = action.payload;
            state.rankings_stats_loading = false
        },
        loading_matches_stats(state,action){
            state.duel_stats_loading= true
        },
        loading_matches_stats_success(state, action){
            state.matches_stats = action.payload;
            state.matches_stats_loading =false;
            state.matches_stats_loading_error = false
        } ,
        loading_matches_stats_failure(state,action) {
            state.matches_stats_loading_error = action.payload;
            state.matches_stats_loading = false
        },
        



    }
});


export const {
    set_player_id,

    //player info
    loading_player_info,
    loading_player_info_success,
    loading_player_info_failure,

    //duels
    loading_duels_info,
    loading_duels_info_success,
    loading_duels_info_failure,
    loading_duels_analytics,
    loading_duels_analytics_success,
    loading_duels_analytics_failure,

    //passes
    loading_passes_info,
    loading_passes_info_success,
    loading_passes_info_failure,
    loading_passes_analytics,
    loading_passes_analytics_success,
    loading_passes_analytics_failure,
    
    
    //shots
    loading_shots_info,
    loading_shots_info_success,
    loading_shots_info_failure,
    loading_shots_analytics,
    loading_shots_analytics_success,
    loading_shots_analytics_failure,
    
    
    //Matches
    loading_matches,
    loading_matches_success,
    loading_matches_failure,


    //Rankings
    loading_rankings,
    loading_rankings_success,
    loading_rankings_failure,
    
    
    //Stats
    loading_duels_stats,
    loading_duels_stats_success,
    loading_duels_stats_failure,
    
    loading_passes_stats,
    loading_passes_stats_success,
    loading_passes_stats_failure,

    loading_rankings_stats,
    loading_rankings_stats_success,
    loading_rankings_stats_failure,


    loading_matches_stats,
    loading_matches_stats_success,
    loading_matches_stats_failure,
    



} = defenderSlicer.actions;


///PLAYER INFO
export const fetch_player_info = (playerId,position) =>   (dispatch) => {
    const API_PLAYER_INFO = 'http://35.246.111.237/api/defenders/playerinfo/' + playerId;
    dispatch(loading_player_info());

    return new Promise((resolve,reject) =>{
        axios.get(API_PLAYER_INFO)
            .then((player)=>{
                dispatch(set_player_id(playerId));
                dispatch(loading_player_info_success(player.data));
                resolve(player.data)
            }).catch((err)=>{
                reject(err);
            dispatch(loading_player_info_failure(err.message))
        })


    })

};


////DUELS
export const fetch_duels_info = (playerId) => async (dispatch) => {
    const API_DUELS_INFO = 'http://35.246.111.237/api/defenders/duels/info/' + playerId;
    dispatch(loading_duels_info());
    await axios.get(API_DUELS_INFO)
        .then((player)=>{
            dispatch(loading_duels_info_success(player.data))
        }).catch((err)=>{
            dispatch(loading_duels_info_failure())
        })
};

export const fetch_duels_analytics = (playerId) => async (dispatch) => {
    const API_DUELS_ANALYTICS = 'http://35.246.111.237/api/defenders/duels/analytics/' + playerId;
    dispatch(loading_duels_analytics());
    await axios.get(API_DUELS_ANALYTICS)
        .then((player)=>{
            dispatch(loading_duels_analytics_success(player.data))
        }).catch((err)=>{
            dispatch(loading_duels_analytics_failure())
        })
};

////PASSES
export const fetch_passes_info = (playerId) => async (dispatch) => {
    const API_PASSES_INFO = 'http://35.246.111.237/api/defenders/passes/info/' + playerId;
    dispatch(loading_passes_info());
    await axios.get(API_PASSES_INFO)
        .then((player)=>{
            dispatch(loading_passes_info_success(player.data))
        }).catch((err)=>{
            dispatch(loading_passes_info_failure())
        })
};

export const fetch_passes_analytics = (playerId) => async (dispatch) => {
    const API_PASSES_ANALYTICS = 'http://35.246.111.237/api/defenders/passes/analytics/' + playerId;
    dispatch(loading_passes_analytics());
    await axios.get(API_PASSES_ANALYTICS)
        .then((player)=>{
            dispatch(loading_passes_analytics_success(player.data))
        }).catch((err)=>{
            dispatch(loading_passes_analytics_failure())
        })
};




//SHOTS
export const fetch_shots_info = (playerId) => async (dispatch) => {
    const API_SHOTS_INFO = 'http://35.246.111.237/api/defenders/shots/info/' + playerId;
    dispatch(loading_shots_info());
    await axios.get(API_SHOTS_INFO)
        .then((player)=>{
            dispatch(loading_shots_info_success(player.data))
        }).catch((err)=>{
            dispatch(loading_shots_info_failure())
        })
};

export const fetch_shots_analytics = (playerId) => async (dispatch) => {
    const API_SHOTS_ANALYTICS = 'http://35.246.111.237/api/defenders/shots/analytics/' + playerId;
    dispatch(loading_shots_analytics());
    await axios.get(API_SHOTS_ANALYTICS)
        .then((player)=>{
            dispatch(loading_shots_analytics_success(player.data))
        }).catch((err)=>{
            dispatch(loading_shots_analytics_failure())
        })
};

//MATCHES
export const fetch_matches = (playerId) => async (dispatch) => {
    const API_MATCHES = 'http://35.246.111.237/api/defenders/matches/' + playerId;
    dispatch(loading_matches());
    await axios.get(API_MATCHES)
        .then((player)=>{
            dispatch(loading_matches_success(player.data))
        }).catch((err)=>{
            dispatch(loading_matches_failure())
        })
};


//RANKINGS
export const fetch_rankings = (playerId) => async (dispatch) => {
    const API_RANKINGS = 'http://35.246.111.237/api/defenders/rankings/' + playerId;
    dispatch(loading_rankings());
    await axios.get(API_RANKINGS)
        .then((player)=>{
            dispatch(loading_rankings_success(player.data))
        }).catch((err)=>{
            dispatch(loading_rankings_failure())
        })
};



/////////////STATS///////

export const fetch_duels_stats = () => (dispatch) => {
    const API_DUELS_STATS = 'http://35.246.111.237/api/defenders/duels/analytics/stats';
    dispatch(loading_duels_stats());
    return new Promise((resolve,reject)=>{
        axios.get(API_DUELS_STATS)
            .then((player)=>{
                dispatch(loading_duels_stats_success(player.data));
                resolve()
            }).catch((err)=>{
            dispatch(loading_duels_stats_failure());
            reject()
        })

    })
};

export const fetch_passes_stats = () => (dispatch) => {
    const API_PASSES_STATS = 'http://35.246.111.237/api/defenders/passes/analytics/stats';
    dispatch(loading_passes_stats());
    return new Promise((resolve,reject)=>{
        axios.get(API_PASSES_STATS)
            .then((player)=>{
                dispatch(loading_passes_stats_success(player.data));
                resolve()
            }).catch((err)=>{
            dispatch(loading_passes_stats_failure());
            reject()
        })

    })
};


export const fetch_rankings_stats = () => (dispatch) => {
    const API_RANKINGS_STATS = 'http://35.246.111.237/api/defenders/rankings/stats';
    dispatch(loading_rankings_stats());
    return new Promise((resolve,reject)=>{
        axios.get(API_RANKINGS_STATS)
            .then((player)=>{
                dispatch(loading_rankings_stats_success(player.data));
                resolve()
            }).catch((err)=>{
            dispatch(loading_rankings_stats_failure());
            reject()
        })

    })
};


export const fetch_matches_stats = (playerId) => (dispatch) => {
    const API_MATCHES_STATS = 'http://35.246.111.237/api/defenders/matches/stats';
    dispatch(loading_matches_stats());
    return new Promise((resolve,reject)=>{
        axios.get(API_MATCHES_STATS)
            .then((player)=>{
                dispatch(loading_matches_stats_success(player.data));
                resolve()
            }).catch((err)=>{
            dispatch(loading_matches_stats_failure());
            reject()
        })

    })
};









export default defenderSlicer.reducer