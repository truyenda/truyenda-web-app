import React, { Component } from "react";
import styles from "./Chart.scss";
import demo from "../../assets/demo.jpg";
export default class Chart extends Component {
   
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="chart-wrapper">
            <div className="chart-item">
               <p className="rank">1</p>
               <img className="img" src={demo} />
               <div className="content">
                  <p className="name-title">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                  <p className="side-title">Author C</p>
                  <p className="status-title">ONGOING - 344</p>
               </div>
            </div>
         </div>
      );
   }
}
