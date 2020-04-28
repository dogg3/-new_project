import React from 'react';
import {connect} from 'react-redux'
import {selectSubreddit, fetchPosts} from "../redux/actions";


const SelectSubreddit = ({dispatch}) =>{
    let input;

    return(
        <div>
            <form
            onSubmit={


                e=>
                {e.preventDefault()
                if(!input.value.trim()){
                    return
                }

                dispatch(selectSubreddit(input.value));
                dispatch(fetchPosts(input.value))
                }
            }

            >
                <input ref={node => input = node} />

                <button type="submit">Select subreddit</button>
            </form>
        </div>
    )
}

export default connect() (SelectSubreddit)