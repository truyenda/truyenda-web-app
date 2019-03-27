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
                  <p className="name-title">Tales of Demons and Gods</p>
                  <p className="side-title">Mad Snail</p>
                  <p className="side-title">ONGOING - 344 chapters</p>
               </div>
            </div>
         </div>
      );
   }
}
