import React from "react";
import styles from "./Menu.scss";
import Button from "../../../components/commonUI/Button";
import logo from "../../../assets/85e9f040-5369-4fdb-8463-90e3d8dabf86.png";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../Home";
import Login from "../../Login/Login";
import SignUp from "../../SignUp/SignUp";
const Menu = props => {
   return (
      <BrowserRouter>
         <header className="header">
            <Link className="logo" to="/">
               <img alt="logo" src={logo} />
            </Link>
            <ul className="main-nav">
               <Link to="/">Home</Link>
               <Link to="/">All Manga</Link>
               <Link to="/">Latest Update</Link>
               <Link to="/login">
                  <span>
                     <Button style="p-login-btn" display="Login" />
                  </span>
               </Link>
            </ul>
         </header>
         <div className="container">
               <Switch>
                  <Route path="/" exact={true} component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
               </Switch>
            </div>
      </BrowserRouter>
   );
};

export default Menu;
