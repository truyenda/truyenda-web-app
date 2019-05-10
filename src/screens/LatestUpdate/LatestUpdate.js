import React, { Component } from "react";
import Chart from "../../components/Chart/Chart";
import Browse from "../../components/Browse/Browse";
import Manga from "../../components/Manga/Manga";
import { Link, Switch, BrowserRouter, Route } from "react-router-dom";
import styles from "./LatestUpdate.scss";
class LatestUpdate extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chartList: (
            <div className="title-type-chart">
               <p className="title-type-chart-content">Daily Chart</p>
               <Chart />
            </div>
         )
      };

      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(event) {
      const type = event.target.id;
      if (type === "daily") {
         let dailyList = (
            <div className="title-type-chart">
               <p>Daily Chart</p>
               <Chart />
            </div>
         );
         this.setState({
            chartList: dailyList
         });
      } else {
         if (type === "weekly") {
            let weeklyChart = (
               <div className="title-type-chart">
                  <p>Weekly Chart</p>
                  <Chart />
               </div>
            );
            this.setState({
               chartList: weeklyChart
            });
         } else {
            let monthlyChart = (
               <div className="title-type-chart">
                  <p>Monthly Chart</p>
                  <Chart />
               </div>
            );
            this.setState({
               chartList: monthlyChart
            });
         }
      }
   }

   render() {
      return (
         <div className="home-wrapper">
            <div className="main-content-col">
               <Manga />
            </div>
            <div className="side-content-col">
              <Browse />
               <div className="chart-col">
                  <div className="chart-header">
                     <p className="chart-title">Phổ biến nhất</p>
                     <ul className="chart-type">
                        <li>
                           <a id="daily" onClick={this.handleClick}>
                              Ngày
                           </a>
                        </li>
                        <li>
                           <a id="weekly" onClick={this.handleClick}>
                              Tuần
                           </a>
                        </li>
                        <li>
                           <a id="monthly" onClick={this.handleClick}>
                              Tháng
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
