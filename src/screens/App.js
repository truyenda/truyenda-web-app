import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Menu from "./Home/Menu";
import Footer from "./Home/Footer/Footer";
import SignUp from "./SignUp/SignUp";
class App extends Component {
   componentWillReceiveProps() {}
   render() {
      return (
         <div>
            <Menu />
            <Footer />
         </div>
      );
   }
}

export default App;
