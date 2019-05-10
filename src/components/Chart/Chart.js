import React, { Component } from "react";
import styles from "./Chart.scss";
import { Link } from "react-router-dom";
import { toComicLink } from "../../utils/LinkUtils";
import ChartApi from "../../api/ChartApi";
export default class Chart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         type: this.props.type,
         dailyComics: [],
         weeklyComics: [],
         monthlyComics: []
      };
   }  

   componentDidMount() {
      this.getDailyList();
      this.getWeeklyList();
      this.getMonthlyList();
      this.setState({
         type: this.props.type
      })
   }

   componentWillReceiveProps() {
      this.getDailyList();
      this.getWeeklyList();
      this.getMonthlyList();
      this.setState({
         type: this.props.type
      })
   }

   getDailyList() {
      //TODO: Change after
      ChartApi.listAll()
         .then(res => {
            this.setState({
               dailyComics: res.data.Data
            })
         })
   }

   getWeeklyList() {
      ChartApi.listRecommended()
         .then(res => {
            this.setState({
               weeklyComics: res.data.Data
            })
         })
   }

   getMonthlyList() {
      ChartApi.listMonth()
         .then(res => {
            this.setState({
               monthlyComics: res.data.Data
            })
         })
   }

   render() {
      const { type, dailyComics, weeklyComics, comics } = this.state;
      const listComics = comics.map(comic => (
         <Link
            to={{
               pathname: toComicLink(
                  comic.TenTruyen,
                  comic.Id
               ),
               state: {
                  comic
               }
            }}
            key={comic.Id}
         >
            <div className="chart-item">
               <p className="rank">{comic.Id}</p>
               <img className="img" src={comic.AnhDaiDien} />
               <div className="content">
                  <p className="name-title">{comic.TenTruyen}</p>
                  <p className="side-title">
                     {[...comic.DanhSachTacGia].map(e => e.TenTacGia).join(",")}
                  </p>
                  <p className="status-title">
                     {comic.TrangThai} | 202020 views
                  </p>
               </div>
            </div>
         </Link>
      ));
      return <div className="chart-wrapper">{listComics}</div>;
   }
}
