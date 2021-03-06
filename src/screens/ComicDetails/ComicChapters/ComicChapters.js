import React, { Component } from "react";
import styles from "./ComicChapters.scss";
import { Link } from "react-router-dom";
import { toChapterLink } from "../../../utils/LinkUtils";
import ComicApi from "../../../api/ComicApi";
export default class ComicChapters extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         allChapters: null,
         isOpen: false
      };
   }

   componentDidMount() {
      ComicApi.getChapters(this.state.comic.Id)
         .then(res => {
            this.setState({
               allChapters: res.data.Data
            });
         })
         .catch(err => {});
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      const { comic, allChapters, isOpen } = this.state;
      const showMoreClassName = isOpen
         ? "comic-chapters-container-open"
         : "comic-chapters-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";

      return (
         <div className={showMoreClassName}>
            <h2>Danh sách chương</h2>
            <div className="comic-chapters-wrapper">
               {allChapters && comic &&
                  allChapters.map(chapter => (
                     <Link
                        to={{
                           pathname: toChapterLink(
                              comic.TenTruyen,
                              chapter.TenChuong,
                              chapter.Id
                           ),
                           state: {
                              chapter
                           }
                        }}
                        key={chapter.Id}
                     >
                        <div
                           className="comic-chapters-item"
                           key={chapter.Id}
                        >
                           <p className="comic-chapters-item-left">
                              {chapter.TenChuong}
                           </p>
                           <p className="comic-chapters-item-right">
                              {chapter.NgayTao} | <span>{chapter.LuotXem}</span> Lượt xem
                           </p>
                        </div>
                     </Link>
                  ))}
            </div>
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
