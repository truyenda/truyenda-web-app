import React, { Component } from "react";
import styles from "./Chart.scss";
import demo from "../../assets/demo.jpg";
import { Link } from "react-router-dom";
import { convertToFriendlyPath } from "../../utils/StringUtils";
import Caller from "../../utils/APICaller";
import { toComicLink } from "../../utils/LinkUtils";
export default class Chart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comics: []
      };
   }

   componentDidMount() {
      Caller("stories/all")
         .then(res => {
            this.setState({
               comics: res.data.Data
            });
         })
         .catch(err => {});
   }

   render() {
      const { comics } = this.state;
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
