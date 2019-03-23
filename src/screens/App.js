import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from 'react-router-dom';

import Home from "./Home";
import Login from "./Login";
import Menu from "./Home/Menu";
import Footer from "./Home/Footer/Footer";
// import SignUp from "./SignUp/SignUp";
class App extends Component {
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
            <Footer />
         </Router>
      );
   }
}

export default App;
