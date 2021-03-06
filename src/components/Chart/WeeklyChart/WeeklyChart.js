import React, { Component } from "react";
import styles from "../Chart.scss";
import { Link } from "react-router-dom";
import { toComicLink } from "../../../utils/LinkUtils";
import ChartApi from "../../../api/ChartApi";
import Progress from "../../commonUI/Progress";

export default class WeeklyChart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comics: null
      };
   }

   componentDidMount() {
      ChartApi.listWeek().then(res => {
         this.setState({
            comics: res.data.Data
         });
      });
   }

   render() {
      const { comics } = this.state;
      const listComics = comics ? (
         comics.map(comic => (
            <Link
               to={{
                  pathname: toComicLink(comic.TenTruyen, comic.Id),
                  state: {
                     comic
                  }
               }}
               key={comic.Id}
            >
               <div className="chart-item">
                  {comics.indexOf(comic) !== 0 && (
                     <p className="rank">{comics.indexOf(comic) + 1}</p>
                  )}
                  {comics.indexOf(comic) === 0 && (
                     <p className="rank-1">{comics.indexOf(comic) + 1}</p>
                  )}
                  <img className="img" src={comic.AnhDaiDien} />
                  <div className="content">
                     <p className="name-title">{comic.TenTruyen}</p>
                     <p className="side-title">
                        {[...comic.DanhSachTacGia]
                           .map(e => e.TenTacGia)
                           .join(",")}
                     </p>
                     <p className="status-title">
                        {comic.TrangThai} | {comic.view} lượt xem
                     </p>
                  </div>
               </div>
            </Link>
         ))
      ) : (
         <Progress />
      );
      return <div className="chart-wrapper">{listComics}</div>;
   }
}
