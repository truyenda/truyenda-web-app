import React, { Component } from "react";
import "./Personal.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFound from "../Error/NotFound.js";
import Profile from "./Profile";
import Bookmark from "./Bookmark";
class Personal extends Component {
  render() {
    return (
      <div className="personal-container">
        <Switch>
          <Route exact={true} path="/personal/profile" component={Profile} />
          <Route exact={true} path="/personal/comics" component={Bookmark} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Personal;
