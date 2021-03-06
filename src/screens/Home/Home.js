import React, { Component } from "react";
import Chart from "../../components/Chart/Chart";
import Browse from "../../components/Browse/Browse";
import Main from "../../components/Main/Main";
import { Link, Switch, BrowserRouter, Route } from "react-router-dom";
import styles from "./Home.scss";
import LatestUpdate from "../LatestUpdate";
import Manga from "../../components/Manga/Manga";
import DailyChart from "../../components/Chart/DailyChart/DailyChart";
import WeeklyChart from "../../components/Chart/WeeklyChart/WeeklyChart";
import MonthlyChart from "../../components/Chart/MonthlyChart/MonthlyChart";
import SearchHome from "../../components/SearchHome/SearchHome";
class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         type: "",
         isOpen: false
      };

      this.handleClick = this.handleClick.bind(this);
   }
   componentDidMount() {
      document.title = "Trang chủ";
      this.setState({
         type: "daily"
      });
   }

   handleClick(event) {
      const type = event.target.id;
      if (type === "daily") {
         this.setState({
            type: "daily"
         });
      } else {
         if (type === "weekly") {
            this.setState({
               type: "weekly"
            });
         } else {
            this.setState({
               type: "monthly"
            });
         }
      }
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      const { type, isOpen } = this.state;
      const showMoreClassName = isOpen ? "chart-col-open" : "chart-col-close";
      const innerShowMore = isOpen ? "" : "Xem thêm";
      return (
         <div className="home-wrapper">
            <div className="main-content-col">
               <Switch>
                  <Route path="/latest-update" exact={true} component={Manga} />
                  <Main />
               </Switch>
            </div>
            <div className="side-content-col">
               <div>
                  <SearchHome />
               </div>
               <Browse isOpenOutside={false} hasButtonShowMore={true} />
               <div className={showMoreClassName}>
                  <div className="chart-header">
                     <p className="chart-title">BẢNG XẾP HẠNG</p>
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
                  <div className="chart-container">
                     {type && type === "daily" && (
                        <div className="title-type-chart">
                           <p>BXH Ngày</p>
                           <DailyChart />
                        </div>
                     )}
                     {type && type === "weekly" && (
                        <div className="title-type-chart">
                           <p>BXH Tuần</p>
                           <WeeklyChart />
                        </div>
                     )}
                     {type && type === "monthly" && (
                        <div className="title-type-chart">
                           <p>BXH Tháng</p>
                           <MonthlyChart />
                        </div>
                     )}
                  </div>
                  <div className="chart-show-more">
                     <p
                        onClick={() => {
                           this.toggle();
                        }}
                     >
                        {innerShowMore}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Home;
