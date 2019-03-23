import React, { Component } from "react";
import Chart from "../../components/Chart/Chart";
import Browse from "../../components/Browse/Browse";
import Main from "../../components/Main/Main";
import styles from "./Home.scss";
class Home extends Component {
   componentDidMount() {}

   render() {
      return (
         <div className="home-wrapper">
            <div className="main-content-col">
               <Main />
            </div>
            <div className="side-content-col">
               <div className="browse-col">
                  <Browse />  
               </div>
               <div className="chart-col">
                  {/* <p className="chart-title">MOST POPULAR</p> */}
                  <Chart />
                  <Chart />
                  <Chart />
                  <Chart />
                  <Chart />
                  <Chart />
               </div>
            </div>
         </div>
      );
   }
}

export default Home;
