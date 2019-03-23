import React, { Component } from "react";
import styles from "./Chart.scss";

export default class Chart extends Component {
   render() {
      return (
         <div className="chart">
            <div className="chart-item">
               <p className="rank">1</p>
               <img className="img" src="https://via.placeholder.com/90x90"></img>
               <div className="content">
                  <p>Tales of Demons and Gods</p>
                  <p>Mad Snail</p>
                  <p>ONGOING - 344 chapters</p>
               </div>
            </div>
         </div>
      );
   }
}
