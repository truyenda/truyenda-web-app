import React from "react";
import styles from "./Menu.scss";
import Button from "../../../components/commonUI/Button";
import logo from "../../../assets/85e9f040-5369-4fdb-8463-90e3d8dabf86.png";

const Menu = props => {
   return (
      <header className="header">
         <a href="#" className="logo"><img alt="logo" src={logo}></img></a>
         <ul className="main-nav">
            <a href="#">Home</a>
            <a href="#">All Manga</a>
            <a href="#">Latest Update</a>
            <a href="#"><span><Button style="p-login-btn" display="Login" /></span></a>
         </ul>
	   </header> 
   );
};

export default Menu;
{
   /* <label htmlFor="toggle">&#9776;</label>
            <input type="checkbox" id="toggle" /> */
}
{
  
}
