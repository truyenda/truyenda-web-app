import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import LatestUpdate from "./LatestUpdate"
import Menu from "./Home/Menu";
import Footer from "./Home/Footer/Footer";
import SignUp from "./SignUp/SignUp";
import NotFound from "./Error/NotFound";
import { ToastContainer } from "react-toastify";
import { sessionService } from "redux-react-session";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import Personal from "./Personal";
class App extends Component {
  
  render() {
    return (
      <Router>
        <Menu />
        <div className="container">
          <Switch>
            <Route path="/latest-update" component={LatestUpdate}/>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
            <Route
              onEnter={sessionService.checkAuth}
              path="/signup"
              component={SignUp}
            />
            <Route path='/personal' component={Personal}/>
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
        <ToastContainer />
        <ScrollUpButton EasingType="easeOutQuint" />
      </Router>
    );
  }
}

export default App;
