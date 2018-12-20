import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import DashBoard from './components/Dashboard';
import './App.css';




class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <DashBoard/>
      </div>
      </Router>
    );
  }
}

export default App;
