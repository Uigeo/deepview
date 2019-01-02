import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Layout from './view/Layout';
import './App.css';
import LoginPage from './view/LoginPage';
import { connect } from 'react-redux';




class App extends Component {
  render() {
    const { user } = this.props;
    return (
      <Router>
      <div className="App">
        {user.userid ? <Layout/> : <LoginPage/>}
        {/* <Route path='/login' component={LoginPage}/>
        <Route path='/main' component={Layout}/> */}
      </div>
      </Router>
    );
  }
}

export default connect(
  (state) => ({
    user : state.user
  })
)(App);
