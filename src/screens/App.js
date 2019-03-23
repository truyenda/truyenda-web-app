import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import SignUp from "./SignUp/SignUp";
class App extends Component {

  componentWillReceiveProps() {}
  render() {
    return (
      <Router>
        <div>
          //menu component here
          <Link to="/">Home</Link>|
          <Link to="/login">Log In</Link>|
          <Link to="/signup">Sign Up</Link>
          <br />
          // start content area
          <div className="container">
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
