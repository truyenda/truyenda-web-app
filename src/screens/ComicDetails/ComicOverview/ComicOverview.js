import React, { Component } from "react";
import styles from "./ComicOverview.scss";
import { Link } from "react-router-dom";
import { convertToFriendlyPath } from "../../../utils/StringUtils";

export default class ComicOverview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      const linkResult = (
         <Link
            to={{
               pathname: convertToFriendlyPath('/comics/reading', comic.TenTruyen, comic.Id),
               state: {
                  comic
               }
            }}
         >
            <p className="comic-overview-bar-item comic-overview-bar-main-item">
               READ
            </p>
         </Link>
      );
      return (
         <div className="comic-overview-container">
            <div className="comic-overview-picture">
               <img src={comic.AnhDaiDien} alt={comic.TenTruyen} />
            </div>
            <div className="comic-overview-content">
               <p className="comic-overview-title">{comic.TenTruyen}</p>
               <p className="comic-overview-subtitle">{comic.comicAuthors}</p>
               <p className="comic-overview-subtitle">{comic.TrangThai}</p>
               <p className="comic-overview-subtitle">202020 views</p>
            </div>
            <div className="comic-overview-bar">
               {linkResult}
               <p className="comic-overview-bar-item">
                  {/* <span>{comic.comicNumberOfChapters}</span> */}
                  <span>100</span>
                   Chapters
               </p>
               <p className="comic-overview-bar-item">Favorite</p>
            </div>
         </div>
      );
   }
}
