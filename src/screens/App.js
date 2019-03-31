import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Menu from "./Home/Menu";
import Footer from "./Home/Footer/Footer";
import SignUp from "./SignUp/SignUp";
import NotFound from "./Error/NotFound";
class App extends Component {
  componentWillReceiveProps() {}
  render() {
    return (
      <Router>
        <Menu />
        <div className="container">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
