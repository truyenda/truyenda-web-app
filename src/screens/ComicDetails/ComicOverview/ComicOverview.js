import React, { Component } from "react";
import styles from "./ComicOverview.scss";
import { Link } from "react-router-dom";
import { convertToFriendlyPath } from "../../../utils/StringUtils";
import { toComicReadLink } from "../../../utils/LinkUtils";
import BookmarkApi from "../../../api/BookmarkApi";
import Toast from "../../../components/commonUI/Toast";

export default class ComicOverview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         isSubscribe: null
      };
   }

   componentDidMount() {
      BookmarkApi.getByComicId(this.state.comic.Id)
         .then(res => {
            if (res.data.Data) {
               this.setState({
                  isSubscribe: true
               });
            } else {
               this.setState({
                  isSubscribe: false
               });
            }
         })
         .catch(err => {});
   }

   componentWillReceiveProps() {
      BookmarkApi.getByComicId(this.state.comic.Id)
         .then(res => {
            if (res.data.Data) {
               this.setState({
                  isSubscribe: true
               });
            } else {
               this.setState({
                  isSubscribe: false
               });
            }
         })
         .catch(err => {});
   }

   subcribe() {
      BookmarkApi.create(this.state.comic.Id).then(res => {
         this.setState({
            isSubscribe: !this.state.isSubscribe
         });
         Toast.success(`Đang theo dõi truyện ${this.state.comic.TenTruyen}`);
      });
   }

   unsubscribe() {
      BookmarkApi.delete(this.state.comic.Id).then(res => {
         this.setState({
            isSubscribe: !this.state.isSubscribe
         });
         Toast.success(`Đã bỏ theo dõi truyện ${this.state.comic.TenTruyen}`);
      });
   }

   render() {
      const { comic, isSubscribe } = this.state;
      const linkResult = (
         <Link
            to={{
               pathname: toComicReadLink(comic.TenTruyen, comic.Id),
               state: {
                  comic
               }
            }}
         >
            {!isSubscribe && (
               <p className="comic-overview-bar-item comic-overview-bar-main-item">
                  READ
               </p>
            )}
            {isSubscribe && (
               <Link>
                  <p className="comic-overview-bar-item comic-overview-bar-main-item">
                     CONTINUE READING
                  </p>
               </Link>
            )}
         </Link>
      );
      return (
         <div className="comic-overview-container">
            <div className="comic-overview-picture">
               <img src={comic.AnhDaiDien} alt={comic.TenTruyen} />
            </div>
            <div className="comic-overview-content">
               <p className="comic-overview-title">{comic.TenTruyen}</p>
               <p className="comic-overview-subtitle">
                  {[...comic.DanhSachTacGia].map(e => e.TenTacGia).join(",")}
               </p>
               <p className="comic-overview-subtitle">{comic.TrangThai}</p>
               <p className="comic-overview-subtitle">
                  {comic.view ? comic.view : 0} views
               </p>
            </div>
            <div className="comic-overview-bar">
               {linkResult}
               <p className="comic-overview-bar-item">
                  <span>{comic.listChuong.length}</span>
                  Chapters
               </p>
               {!isSubscribe && (
                  <p
                     className="comic-overview-bar-item comic-overview-bar-main-item-subscribe"
                     onClick={() => this.subcribe()}
                  >
                     Theo dõi
                  </p>
               )}
               {isSubscribe && (
                  <p
                     className="comic-overview-bar-item comic-overview-bar-main-item-subscribed"
                     onClick={() => this.unsubscribe()}
                  >
                     Đang Theo dõi
                  </p>
               )}
            </div>
         </div>
      );
   }
}
