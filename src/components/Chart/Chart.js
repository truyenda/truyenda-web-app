import React, { Component } from "react";
import styles from "./Chart.scss";
import demo from "../../assets/demo.jpg";
import { Link } from "react-router-dom";
import { convertToFriendlyPath } from "../../utils/StringUtils";
import Caller from "../../utils/APICaller";
export default class Chart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // avatars: [
         //    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png",
         //    "http://www.sclance.com/pngs/avatar-icon-png/avatar_icon_png_70847.jpg",
         //    "https://ya-webdesign.com/images/girl-avatar-png-19.png",
         //    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg",
         //    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9475211889067.562541caf0859.png"
         // ],
         comics: []
      };
   }

   componentDidMount() {
      Caller("story/all").then(res => {
         this.setState({
            comics: res.data.Data
         });
      });
   }

   render() {
      const { comics } = this.state;
      const listComics = comics.map(comic => (
         <Link
         to={{
            pathname: convertToFriendlyPath(
               "/comics",
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
                  <p className="side-title">{[...comic.DanhSachTacGia].map(e => e.TenTacGia).join(",")}</p>
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
