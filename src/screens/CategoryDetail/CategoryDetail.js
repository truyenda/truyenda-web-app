import React, { Component } from "react";
import styles from "./CategoryDetail.scss";
import { getIdBySplitingPath, toComicLink } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import Progress from "../../components/commonUI/Progress";
import { Link } from "react-router-dom";
import Browse from "../../components/Browse";
import Photo from "../../components/commonUI/Photo";
import Button from "../../components/commonUI/Button";

export default class CategoryDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         genre: this.props.location.state.genre,
         allComics: null,
         isError: false,
         isError404: false,
         isOpen: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "categories/");
         if (!isNaN(id)) {
            ComicApi.getByCategory(id)
               .then(res => {
                  this.setState({
                     genre: this.props.location.state.genre,
                     allComics: res.data.Data
                  });
               })
               .catch(err => {
                  this.setState({
                     isError: true
                  });
               });
         }
      } catch (err) {
         this.setState({
            isError404: true
         });
      }
   }

   componentWillReceiveProps() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "categories/");
         if (!isNaN(id)) {
            ComicApi.getByCategory(id)
               .then(res => {
                  this.setState({
                     genre: this.props.location.state.genre,
                     allComics: res.data.Data
                  });
               })
               .catch(err => {
                  this.setState({
                     isError: true
                  });
               });
         }
      } catch (err) {
         this.setState({
            isError404: true
         });
      }
   }

   toggle() {
      this.setState({
         isOpen: true
      });
   }

   render() {
      const { genre, allComics, isError, isError404, isOpen } = this.state;
      const showMoreClassName = isOpen
         ? "category-detail-main-all-comics"
         : "category-detail-main-all-comics-hide";
      const showMoreButtonClassName = isOpen
         ? "category-detail-main-header-show-more-hide"
         : "category-detail-main-header-show-more";
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <Progress display="Please wait..." />;
      }
      return (
         <div className="category-detail-container">
            <div className="category-detail-main-content">
               {genre && allComics && allComics[0] && allComics[0].AnhBia !== "" && (
                  <div className="category-detail-main-header">
                     <img src={allComics[0].AnhBia} />
                     <p className="category-detail-main-header-name">
                        {genre.TenLoaiTruyen}
                     </p>
                     <p className="category-detail-main-header-description">
                        {genre.MoTa}
                     </p>
                     <p
                        onClick={() => this.toggle()}
                        className={showMoreButtonClassName}
                     >
                        Danh sách truyện
                     </p>
                  </div>
               )}
               {genre && allComics && !allComics[0] && (
                  <div className="category-detail-main-header">
                     <img src="https://www.wallpapersin4k.org/wp-content/uploads/2017/04/Colorful-Geometric-Wallpaper-12.png" />
                     <p className="category-detail-main-header-name">
                        {genre.TenLoaiTruyen}
                     </p>
                     <p className="category-detail-main-header-description">
                        {genre.MoTa}
                     </p>
                     <p className="category-detail-main-header-nothing">Chưa có truyện thuộc thể loại này</p>
                  </div>
               )}
               {(!genre || !allComics) && (<Progress />)}
               {allComics && (
                  <div className={showMoreClassName}>
                     {allComics.map(c => (
                        <Link
                           to={{
                              pathname: toComicLink(c.TenTruyen, c.Id),
                              state: {
                                 comic: c
                              }
                           }}
                           key={c.Id}
                        >
                           <div className="category-comic-item">
                              <img src={c.AnhDaiDien} alt={c.TenTruyen} />
                              <div className="category-comic-item-content">
                                 <p className="category-comic-item-content-title">
                                    {c.TenTruyen}
                                 </p>
                                 <p className="category-comic-item-content-authors">
                                    {c.DanhSachTacGia.map(a => a.TenTacGia)}
                                 </p>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
            <div className="category-detail-side-content">
               <Browse isOpenOutside={true} hasButtonShowMore={false} />
            </div>
         </div>
      );
   }
}
