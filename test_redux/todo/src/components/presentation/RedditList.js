import React from 'react';

const RedditList = ({posts}) =>{


        if(posts) {
                return (
                    <ul>
                            {posts.map((post, index) => (

                                <li key={index} {...post}>{post.selftext}</li>
                            ))}
                    </ul>
                )
        }
        return(<p>no posts</p>)

}
export default RedditList