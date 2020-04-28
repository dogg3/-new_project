
import { combineReducers } from 'redux'


function selectSubreddit(state='reactjs', action){
    switch (action.type) {
        case 'SELECT_SUBREDDIT':
            return action.subreddit
        default:
            return state
    }
}



function posts(state={isFetching:false, didInvalidate:false, items:[]}, action){
    switch (action.type) {
        case 'INVALIDATE_SUBREDDIT':
            return Object.assign({}, state,{
                didInvalidate: true
            })
        case 'REQUEST_POSTS':
            return Object.assign({}, state, {
                isFetching:true,
                didInvalidate:false
            })
        case 'RECIEVE_POSTS':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate:false,
                items: action.posts,
                lastUpdated: action.recievedAt
        })
        default:
            return state
    }

}


function postBySubreddit(state={}, action){
    switch(action.type){
        case 'INVALIDATE_SUBREDDIT':
        case 'RECIEVE_POSTS':
        case 'REQUEST_POSTS':
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
    }
}

export default combineReducers({
    postBySubreddit,
    posts,
    selectSubreddit

})