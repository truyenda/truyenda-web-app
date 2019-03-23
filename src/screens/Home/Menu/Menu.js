import React from "react";
import styles from "./Menu.scss";
import Button from '../../../components/commonUI/Button'

const Menu = props => {
   return (
      <div>
         <div className="nav">
            <label htmlFor="toggle">&#9776;</label>
            <input type="checkbox" id="toggle" />
            <div className="menu">
               <a href="#" id="logo">TRUYEN<i>DA</i></a>
               <a href="#">Home</a>
               <a href="#">All</a>
               <a href="#">Latest</a>
               <a href="#">About</a>
               <a href="#"><span><Button style="p-login-btn" display="Login" /></span></a>
            </div>
         </div>
      </div>
   );
};

export default Menu;
