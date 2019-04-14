import React, { Component } from "react";
import styles from "./Avatar.scss";

export default class Avatar extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="avatar-container">
            <img src={this.props.src} alt="Avatar" />
         </div>
      );
   }
}
