import React, { Component } from "react";
import styles from "./ComicOverview.scss";
import { Link } from "react-router-dom";
import { convertToFriendlyPath } from "../../../utils/StringUtils";
import { toComicReadLink, toChapterLink } from "../../../utils/LinkUtils";
import BookmarkApi from "../../../api/BookmarkApi";
import Toast from "../../../components/commonUI/Toast";

export default class ComicOverview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         isSubscribe: null,
         currentChapterId: null,
         currentChapterTitle: null
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
            if (res.data.Data.Id_ChuongDanhDau) {
               this.setState({
                  currentChapterId: res.data.Data.Id_ChuongDanhDau,
                  currentChapterTitle: res.data.Data.TenChuongDanhDau
               });
            } else {
               this.setState({
                  currentChapterId: res.data.Data.Id_ChuongMoiNhat,
                  currentChapterTitle: res.data.Data.TenChuongMoiNhat
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
            if (res.data.Data.Id_ChuongDanhDau) {
               this.setState({
                  currentChapterId: res.data.Data.Id_ChuongDanhDau,
                  currentChapterTitle: res.data.Data.TenChuongDanhDau
               });
            } else {
               this.setState({
                  currentChapterId: res.data.Data.Id_ChuongMoiNhat,
                  currentChapterTitle: res.data.Data.TenChuongMoiNhat
               });
            }
         })
         .catch(err => {});
   }

   subcribe() {
      BookmarkApi.create(this.state.comic.Id).then(res => {
         Toast.success(`Đang theo dõi truyện ${this.state.comic.TenTruyen}`);
         this.setState({
            isSubscribe: true
         });
      });
      window.scrollTo(0, 1000);
   }

   unsubscribe() {
      BookmarkApi.delete(this.state.comic.Id).then(res => {
         Toast.success(`Đã bỏ theo dõi truyện ${this.state.comic.TenTruyen}`);
         this.setState({
            isSubscribe: false
         });
      });
   }

   render() {
      const {
         comic,
         isSubscribe,
         currentChapterId,
         currentChapterTitle
      } = this.state;
      const linkResult = currentChapterId && currentChapterTitle && (
         <Link
            to={{
               pathname: toChapterLink(
                  comic.TenTruyen,
                  currentChapterTitle,
                  currentChapterId
               ),
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
               <p className="comic-overview-bar-item comic-overview-bar-main-item">
                  TIẾP TỤC ĐỌC
               </p>
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
                  <span>{comic.view ? comic.view : 0}</span> lượt xem
               </p>
            </div>
            <div className="comic-overview-bar">
               {linkResult}
               <p className="comic-overview-bar-item">
                  <span>{comic.listChuong.length}</span>
                  chương
               </p>
               {!isSubscribe && (
                  <p
                     className="comic-overview-bar-item comic-overview-bar-main-item-subscribe"
                     onClick={() => this.subcribe()}
                  >
                     THEO DÕI
                  </p>
               )}
               {isSubscribe && (
                  <p
                     className="comic-overview-bar-item comic-overview-bar-main-item-subscribed"
                     onClick={() => this.unsubscribe()}
                  >
                     ĐANG THEO DÕI
                  </p>
               )}
            </div>
         </div>
      );
   }
}
