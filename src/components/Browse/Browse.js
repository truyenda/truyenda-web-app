import React, { Component } from "react";
import styles from "./Browse.scss";

export default class Browse extends Component {
   render() {
      return (
         <div class="wrapper">
            <p class="title">Browse By Genres</p>
            <div className="browse">
               <div class="col">
                  <p>Action</p>
                  <p>Adventure</p>
                  <p>Police</p>
               </div>
               <div class="col">
                  <p>Demons</p>
                  <p>Drama</p>
                  <p>Comedy</p>
                  <p>Fantasy</p>
               </div>
            </div>
         </div>
      );
   }
}
