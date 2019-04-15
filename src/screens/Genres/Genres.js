import React, { Component } from "react";
import Chart from "../../components/Chart/Chart";
import Browse from "../../components/Browse/Browse";
import Manga from "../../components/Manga/Manga";
import { Link, Switch, BrowserRouter, Route } from "react-router-dom";
import styles from "./LatestUpdate.scss";
class Genres extends Component {
   render() {
      return (
         <div className="home-wrapper">
            <div className="main-content-col">
               <Manga />
            </div>
            <div className="side-content-col">
               <div className="browse-col">
                  <Browse />
               </div>
               <div className="chart-col">
                  <div className="chart-header">
                     <p className="chart-title">MOST POPULAR</p>
                     <ul className="chart-type">
                        <li>
                           <a id="daily" onClick={this.handleClick}>
                              Daily
                           </a>
                        </li>
                        <li>
                           <a id="weekly" onClick={this.handleClick}>
                              Weekly
                           </a>
                        </li>
                        <li>
                           <a id="monthly" onClick={this.handleClick}>
                              Monthly
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className="chart-container">{this.state.chartList}</div>
               </div>
            </div>
         </div>
      );
   }
}

export default LatestUpdate;
