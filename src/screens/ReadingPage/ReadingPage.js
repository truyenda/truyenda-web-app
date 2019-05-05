import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";
import { getIdBySplitingPath, toChapterLink } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import ChapterApi from "../../api/ChapterApi";
import Progress from "../../components/commonUI/Progress";
import { Waypoint } from "react-waypoint";
import LocalBookmarkApi from "../../api/LocalBookmarkApi";
import { Link } from "react-router-dom";
export default class ReadingPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chapter: null,
         allChapters: null,
         isError: false,
         isError404: false,
         isGetDone: false
      };
   }

   componentDidMount() {
      window.scrollTo(0, 0);
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "chapters/");
         if (!isNaN(id)) {
            ChapterApi.get(id)
               .then(res => {
                  let data = res.data.Data;
                  data.LinkAnh = JSON.parse(data.LinkAnh);
                  this.setState(
                     {
                        chapter: data
                     },
                     () => setTimeout(() => this.getLocalBookmark(), 1000)
                  );
                  document.title = data.TenTruyen + " - " + data.TenChuong;
                  ChapterApi.list(data.IdTruyen)
                     .then(res => {
                        this.setState({
                           allChapters: res.data.Data
                        });
                     })
                     .catch(err => {});
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
      window.scrollTo(0, 0);  
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "chapters/");
         if (!isNaN(id)) {
            ChapterApi.get(id)
               .then(res => {
                  let data = res.data.Data;
                  data.LinkAnh = JSON.parse(data.LinkAnh);
                  this.setState(
                     {
                        chapter: data
                     },
                     () => setTimeout(() => this.getLocalBookmark(), 1000)
                  );
                  document.title = data.TenTruyen + " - " + data.TenChuong;
                  ChapterApi.list(data.IdTruyen)
                     .then(res => {
                        this.setState({
                           allChapters: res.data.Data
                        });
                     })
                     .catch(err => {});
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

   getLocalBookmark() {
      let index = LocalBookmarkApi.get(this.state.chapter.Id);
      if (index !== 0) {
         let page = document.getElementById("image" + index);
         page.scrollIntoView();
      }
      this.setState({ isGetDone: true });
   }

   saveLocalBookmark(index) {
      if (this.state.isGetDone) {
         if (index === 0 || this.state.chapter.LinkAnh.length - 1 === index)
            LocalBookmarkApi.remove(this.state.chapter.Id);
         else {
            LocalBookmarkApi.save(this.state.chapter.Id, index);
         }
      }
   }

   getListAllChapters(idComic) {
      let data = [];
      ChapterApi.list(idComic)
         .then(res => {
            data = res.data.Data;
         })
         .catch(err => {});
      return data;
   }

   checkNextChapter() {

   }

   render() {
      const { chapter, allChapters, isError, isError404 } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <Progress />;
      }
      return (
         <div className="reading-page-container">
            {chapter && (
               <div className="reading-page">
                  <p>Chapter {chapter.Id}</p>
                  {chapter.LinkAnh.map((c, i) => (
                     <Waypoint key={i} onEnter={v => this.saveLocalBookmark(i)}>
                        <img
                           id={"image" + i}
                           src={c}
                           alt={
                              this.state.chapter.TenTruyen +
                              " trang + " +
                              (i + 1)
                           }
                        />
                     </Waypoint>
                  ))}

                  <div className="control-bar">
                     {allChapters && (chapter.SoThuTu !== allChapters[0].SoThuTu) && (
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
                     )}
                     {allChapters && (chapter.SoThuTu !== allChapters[allChapters.length - 1].SoThuTu) && (
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
                     )}
                  </div>
               </div>
            )}
            {!chapter && <div className="comic-details">Nothing to show</div>}
         </div>
      );
   }
}
