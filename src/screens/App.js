import React, { Component } from "react";
import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import LatestUpdate from "./LatestUpdate";
import AllManga from "./AllManga"
import Menu from "./Home/Menu";
import Footer from "./Home/Footer/Footer";
import SignUp from "./SignUp/SignUp";
import NotFound from "./Error/NotFound";
import { ToastContainer } from "react-toastify";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import Personal from "./Personal";
import ComicDetails from "../screens/ComicDetails";
import ReadingPage from "./ReadingPage/ReadingPage";
import Dashboard from "./Dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import '../assets/react-table.css';
import TeamProfile from './TeamProfile';
import Account from "./Dashboard/Account/Account";
import CategoryDetail from "./CategoryDetail/CategoryDetail";
class App extends Component {
  render() {
    return (
      <Router>
        <Menu />
        <div className="container">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/all-manga" component={AllManga}/>
            <Route path="/latest-update" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/signup" exact={true} component={SignUp} />
            <PrivateRoute path="/personal" component={Personal} />
            <PrivateRoute path="/dashboard" per="TEST" component={Dashboard} />
            <Route path="/comics/read" component={ReadingPage} />
            <Route path="/comics" component={ComicDetails} />
            <Route path="/categories" component={CategoryDetail} />
            <Route path="/teams" component={TeamProfile}/>
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
