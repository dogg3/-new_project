
function fetchPlayersRequest(){
    return {
        type: 'FETCH_PLAYERS_REQUEST',
    }
}

function fetchPlayersSuccess(body){
    return{
        type: 'FETCH_PLAYERS_SUCCESS',
        body
    }
}



function fetchPlayersFailure(ex){
    return{
        type: 'FETCH_PLAYERS_FAILURE',
        ex
    }
}


export function fetchPlayers() {
    return dispatch => {
        dispatch(fetchPlayersRequest());
        return fetch('http://example.com/todos')
            .then(res => res.json())
            .then(body => dispatch(fetchPlayersSuccess(body)))
            .catch(ex => dispatch(fetchPlayersFailure(ex)))
    }


}