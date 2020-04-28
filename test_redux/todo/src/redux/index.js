import rootReducer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from "redux-thunk";
import {createLogger} from 'redux-logger'
import { selectSubreddit, fetchPosts } from './actions'

const loggerMiddleware = createLogger()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))


export default store