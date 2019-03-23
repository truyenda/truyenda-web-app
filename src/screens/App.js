import React, { Component } from "react";
import logo from "../assets/logo.svg";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from "../components/commonUI/Button";
import Progress from "../components/commonUI/Progress";
import TextInput from "../components/commonUI/TextInput";
import TextArea from "../components/commonUI/TextArea";
import CheckBox from '../components/commonUI/CheckBox';
import SelectBox from '../components/commonUI/SelectBox';

import Home from './Home';
import Login from './Login';
import Menu from './Home/Menu'
// import SignUp from "./SignUp/SignUp";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "hello",
      remember: false,
      selectbox: 1
    };
  }
  onClick() {
    console.log(this.state);
    console.log("clicked");
  }
  setStateForm(key, value) {
    let fields = this.state;
    fields[key] = value;
    this.setState(fields);
    console.log(this.state);
  }

  componentWillReceiveProps() {}
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Link to="/">Home</Link>|
          <Link to="/login">Log In</Link>|
          <Link to="/signup">Sign Up</Link>
          // start content area
          <div className="container">
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" component={Login} />
              {/* <Route path="/signup" component={SignUp} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
