import React, { Component } from "react";
import Chart from "../../components/Chart/Chart";
import Browse from "../../components/Browse/Browse";
import Main from "../../components/Main/Main";
import { Link, Switch, BrowserRouter, Route } from "react-router-dom";
import styles from "./Home.scss";
class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chartList: (
            <div className="title-type-chart">
               <p>Daily Chart</p>
               <Chart />
            </div>
         )
      };

      this.handleClick = this.handleClick.bind(this);
   }
   componentDidMount() {
      document.title = 'Trang chủ'
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
               <Main />
            </div>
            <div className="side-content-col">
               <Browse />
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

export default Home;
