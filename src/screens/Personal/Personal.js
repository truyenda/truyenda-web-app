import React, { Component } from "react";
import "./Personal.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import Login from "../Login";
import NotFound from "../Error/NotFound.js";
import TextInput from "../../components/commonUI/TextInput";
import Button from "../../components/commonUI/Button";
import Profile from './Profile';
class Personal extends Component {
  render() {
    return (
      <div className='personal-container'>
        <Switch>
          <Route exact={true} path="/personal/profile" component={Profile} />
          <Route exact={true} path="/personal/comics" component={Bookmark} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const Bookmark = props => {
    return (
        <div>
            <Button
                display='Bookmark'
            />
        </div>
    );
}

export default Personal;
