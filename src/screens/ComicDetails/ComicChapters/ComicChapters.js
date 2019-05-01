import React, { Component } from "react";
import styles from "./ComicChapters.scss";
import { Link } from "react-router-dom";
import { toChapterLink } from "../../../utils/LinkUtils";

/*
TODO: 
  [OK] 1. Add attribute comicNumberOfChapters
  [OK] 2. Render as list 
  3. Add attribute comicGenres
  4. Render as tag
  5. Combine Author component into Description 
*/
export default class ComicChapters extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         isOpen: false
      };
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      const { comic, isOpen } = this.state;
      const showMoreClassName = isOpen
         ? "comic-chapters-container-open"
         : "comic-chapters-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";
      const chapters = comic.listChuong;

      const listChapters = chapters.map(chapter => (
         <Link
            to={{
               pathname: toChapterLink(
                  comic.TenTruyen,
                  chapter.TenChuong,
                  chapter.IdChuong
               ),
               state: {
                  comic: comic
               }
            }}
         >
            <div className="comic-chapters-item" key={chapter.IdChuong}>
               <p className="comic-chapters-item-left">
                  Chapter {chapter.soThuTu}
               </p>
               <p className="comic-chapters-item-right">{chapter.ngayTao}</p>
            </div>
         </Link>
      ));

      return (
         <div className={showMoreClassName}>
            <h2>Chapters</h2>
            <div className="comic-chapters-wrapper">{listChapters}</div>
            <div className="comic-chapters-show-more">
               <p
                  onClick={() => {
                     this.toggle();
                  }}
               >
                  {innerShowMore}
               </p>
            </div>
         </div>
      );
   }
}
