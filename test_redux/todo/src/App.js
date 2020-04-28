import React from 'react';
import logo from './logo.svg';
import FilterLink from './containers/FilterLink'
import SelectSubreddit from './containers/SelectSubreddit'
import Footer from './components/presentation/Footer'
import './App.css';
import RedditListContainer from "./containers/RedditListContainer";
import AddTodo from './containers/AddTodo'
import VisibleTodoList from "./containers/VisibleTodoList";

function App() {
  return (
    <div className="App">
      <h2>hej</h2>
        <AddTodo/>
      <VisibleTodoList/>
      <SelectSubreddit/>
        <RedditListContainer/>
      <Footer/>
    </div>
  );
}

export default App;
