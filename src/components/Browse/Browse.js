import React, { Component } from "react";
import styles from "./Browse.scss";

export default class Browse extends Component {
   render() {
      return (
         <div className="browse-wrapper">
            <p className="title">Browse By Genres <span id="show-more"><a href="#">Show more</a></span></p>
            <div className="browse">
               <div className="col">
                  <p>Action</p>
                  <p>Adventure</p>
                  <p>Police</p>
               </div>
               <div className="col">
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
