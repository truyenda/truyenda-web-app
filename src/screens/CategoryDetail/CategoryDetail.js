import React, { Component } from "react";
import styles from "./CategoryDetail.scss";
import { getIdBySplitingPath, toComicLink } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import Progress from "../../components/commonUI/Progress";
import { Link } from "react-router-dom";
import Browse from "../../components/Browse";

export default class CategoryDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         genre: this.props.location.state.genre,
         allComics: null,
         isError: false,
         isError404: false
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


   render() {
      const { genre, allComics, isError, isError404 } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <Progress display="Please wait..." />;
      }
      return (
         <div className="category-detail-container">
            <div className="category-detail-main-content">
               {genre !== null && (
                  <div className="category-detail-main-header">
                     <p>{genre.Id}</p>
                     <p>{genre.TenLoaiTruyen}</p>
                     <p>{genre.MoTa}</p>
                  </div>
               )}
               {allComics && (
                  <div className="category-detail-main-all-comics">
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
                              <p>{c.TenTruyen}</p>
                              <p>{c.DanhSachTacGia.map(a => a.TenTacGia)}</p>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
            <div className="category-detail-side-content">
               <Browse />
            </div>
         </div>
      );
   }
}
