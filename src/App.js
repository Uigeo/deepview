import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';





class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Layout/>
      </div>
      </Router>
    );
  }
}

export default App;
