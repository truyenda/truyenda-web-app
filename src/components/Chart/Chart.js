import React, { Component } from "react";
import styles from "./Chart.scss";
import demo from "../../assets/demo.jpg";
export default class Chart extends Component {
   render() {
      return (
         <div className="chart-wrapper">
            <div className="chart-item">
               <p className="rank">1</p>
               <img className="img" src={demo} />
               <div className="content">
                  <p class="name-title">Tales of Demons and Gods</p>
                  <p class="side-title">Mad Snail</p>
                  <p class="side-title">ONGOING - 344 chapters</p>
               </div>
            </div>
         </div>
      );
   }
}
