

/*
    Action creators
*/
let nextTodoId = 0
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text

})


export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})


export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})




export const selectSubreddit = subreddit =>{
    return {
        type: 'SELECT_SUBREDDIT',
        subreddit
    }
}


export const invalidateSubreddit = subreddit => {
    return {
        type: 'INVALIDATE_SUBREDDIT',
        subreddit
    }
}



export const requestPosts = subreddit =>{
    return {
        type: 'REQUEST_POSTS',
        subreddit
    }
}



export const receievePosts = (subreddit, json) =>{
   return {
       type: 'RECIEVE_POSTS',
       subreddit,
       posts:json.data.children.map(child => child.data),
       recievedAt: Date.now()
   }
}



/// Thunk action creators
///Does not have to be pure
//Though its insides are different they are used just like any other action cretors.
//store.dispatch(fetchPosts('reactjs'))


export function fetchPosts(subreddit){

    return function(dispatch){
        dispatch(requestPosts(subreddit))



        //The function called by the thunk middleware can return a value

        // return a promise to wait for


        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(
                response => response.json(),

                //do not catch beaacue it will catch error in dispatch also
                error => console.log('An error occured', error)
            )
        .then(json =>
        //Update app sate with results of the API call
            dispatch(receievePosts(subreddit, json))

        )
    }
}




/*
Other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED:'SHOW_COMPLETED',
    SHOW_ACTIVE:'SHOW_ACTIVE'
}

