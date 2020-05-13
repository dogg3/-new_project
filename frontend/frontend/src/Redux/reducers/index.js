import { combineReducers } from 'redux'



function playerFetch(state={isFetching:false, players:[]}, action){
    switch (action) {
        case 'FETCH_PLAYERS_REQUEST':
            return Object.assign({}, state,{
                isFetching:true
            });

        case 'FETCH_PLAYERS_SUCCESS':
            return Object.assign({}, state,{
                isFetching:false,
                players: action.body
            });

        default:
            return state
    }
}


const rootReducer = combineReducers({
    playerFetch
});


export default rootReducer