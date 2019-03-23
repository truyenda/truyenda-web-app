import React, { Component } from "react";
import Chart from "../../components/Chart/Chart";
import Browse from "../../components/Browse/Browse";
import styles from "./Home.scss";
class Home extends Component {
   componentDidMount() {}

   render() {
      return (
         <div className="home-wrapper">
            <div className="browse-col">
               <Browse />
            </div>
            <div className="chart-col">
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
               <Chart />
            </div>
         </div>
      );
   }
}

export default Home;
