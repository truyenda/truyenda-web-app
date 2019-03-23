import React from "react";
import styles from "./Menu.scss";
import Button from "../../../components/commonUI/Button";
import logo from "../../../assets/85e9f040-5369-4fdb-8463-90e3d8dabf86.png";

const Menu = props => {
   return (
      <div>
         <div className="nav">
            <label htmlFor="toggle">&#9776;</label>
            <input type="checkbox" id="toggle" />
            <div className="menu">
               {/* <div className="flex-item">
                  <a href="#" id="logo">
                     <img alt="logo" src={logo} />
                  </a>
               </div> */}
               <div class="flex-item">
                  <a href="#">Home</a>
                  <a href="#">All</a>
                  <a href="#">Latest</a>
                  <a href="#">About</a>
                  <a href="#">
                     <span>
                        <Button style="p-login-btn" display="Login" />
                     </span>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Menu;
