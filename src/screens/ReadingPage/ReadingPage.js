import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";
import { getIdBySplitingPath, toChapterLink } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import ChapterApi from "../../api/ChapterApi";
import Progress from "../../components/commonUI/Progress";
import { Link } from "react-router-dom";

export default class ReadingPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chapter: null,
         allChapters: null,
         isError: false,
         isError404: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var idChapter = getIdBySplitingPath(url, "chapters/");
         if (!isNaN(idChapter)) {
            ChapterApi.get(idChapter)
               .then(res => {
                  this.setState({
                     chapter: res.data.Data
                  });
                  document.title = res.data.Data.TenTruyen;
                  ComicApi.getChapters(this.state.chapter.IdTruyen)
                     .then(res => {
                        this.setState({
                           allChapters: res.data.Data
                        });
                     })
                     .catch(err => {
                        this.setState({
                           isError: true
                        });
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
         var idChapter = getIdBySplitingPath(url, "chapters/");
         if (!isNaN(idChapter)) {
            ChapterApi.get(idChapter)
               .then(res => {
                  this.setState({
                     chapter: res.data.Data
                  });
                  document.title = res.data.Data.TenTruyen;
                  ComicApi.getChapters(this.state.chapter.IdTruyen)
                     .then(res => {
                        this.setState({
                           allChapters: res.data.Data
                        });
                     })
                     .catch(err => {
                        this.setState({
                           isError: true
                        });
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
      const { chapter, allChapters, isError, isError404 } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <span>Có lỗi xảy ra trong quá trình kết nối</span>;
      }
      return (
         <div className="reading-page-container">
            {chapter && (
               <div className="reading-page">
                  <p>Chapter {chapter.Id}</p>
                  {chapter.LinkAnh.split(",").map(c => (
                     <img key={c} src={c} alt="" />
                  ))}
                  <div className="control-bar">
                     <Link
                        to={{
                           pathname: toChapterLink(
                              chapter.TenTruyen,
                              chapter.TenChuong,
                              chapter.Id - 1
                           ),
                           state: {}
                        }}
                     >
                        <p>Previous Chapter</p>
                     </Link>
                     <Link
                        to={{
                           pathname: toChapterLink(
                              chapter.TenTruyen,
                              chapter.TenChuong,
                              chapter.Id + 1
                           ),
                           state: {}
                        }}
                     >
                        <p>Next Chapter</p>
                     </Link>
                  </div>
               </div>
            )}
            {!chapter && <div className="comic-details">Nothing to show</div>}
         </div>
      );
   }
}
