import {connect} from 'react-redux'
import RedditList from "../components/presentation/RedditList";
const mapStateToProps = (state, ownProps) =>{
 if(state.redditReducers.posts.items){

  return{
      posts: state.redditReducers.posts.items
  }
 }else{
  return {
   posts: ""
  }
 }

}


const RedditListContainer = connect(
    mapStateToProps
)(RedditList)

export default RedditListContainer