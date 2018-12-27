import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Layout from './view/Layout';
import './App.css';
import Login from './view/Login';





class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route path='/login' component={Login}/>
        <Route path='/main' component={Layout}/>
      </div>
      </Router>
    );
  }
}

export default App;
