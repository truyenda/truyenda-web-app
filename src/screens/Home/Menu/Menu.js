import React from "react";
import styles from "./Menu.scss";
import Button from "../../../components/commonUI/Button";
import logo from "../../../assets/85e9f040-5369-4fdb-8463-90e3d8dabf86.png";
import { Link } from "react-router-dom";
const Menu = props => {
  return (
    <header className="header">
      <Link className="logo" to="/">
        <img alt="logo" src={logo} />
      </Link>
      <ul className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/all-manga">All Manga</Link>
        <Link to="/latest-update">Latest Update</Link>
        <Link to="/login">
          <span>
            <Button style="p-login-btn" display="Login" />
          </span>
        </Link>
      </ul>
    </header>
  );
};

export default Menu;
