import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";
import {
   getIdBySplitingPath,
   toChapterLink,
   toComicLink
} from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import ChapterApi from "../../api/ChapterApi";
import Progress from "../../components/commonUI/Progress";
import { Waypoint } from "react-waypoint";
import LocalBookmarkApi from "../../api/LocalBookmarkApi";
import { Link } from "react-router-dom";
import SearchPage from "../../components/SearchPage/SearchPage";
import Bookmark from "../../components/commonUI/Bookmark";
import Photo from "../../components/commonUI/Photo";
import BookmarkApi from "../../api/BookmarkApi";
import Toast from "../../components/commonUI/Toast";
export default class ReadingPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chapter: null,
         allChapters: null,
         isError: false,
         isError404: false,
         isGetDone: false,
         isSubscribed: false,
         isBookmarked: false,
         isLoading: false
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
                  this.setState({
                     chapter: data,
                     isLoading: true
                  });
                  this.checkSubscribed();
                  this.checkBookmarked();
                  document.title = data.TenTruyen + " - " + data.TenChuong;
                  ChapterApi.list(data.Id_Truyen)
                     .then(res => {
                        this.setState(
                           {
                              allChapters: res.data.Data,
                              isLoading: false
                           },
                           () =>
                              setTimeout(() => {
                                 this.getLocalBookmark();
                              }, 1200)
                        );
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
                  this.checkSubscribed();
                  this.checkBookmarked();
                  this.setState({
                     chapter: data,
                     isLoading: true
                  });
                  document.title = data.TenTruyen + " - " + data.TenChuong;
                  ChapterApi.list(data.Id_Truyen)
                     .then(res => {
                        this.setState(
                           {
                              allChapters: res.data.Data,
                              isLoading: false
                           },
                           () =>
                              setTimeout(() => {
                                 this.getLocalBookmark();
                              }, 1200)
                        );
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
      let index = LocalBookmarkApi.get(this.state.chapter.Id_Chuong);
      if (index !== 0) {
         let page = document.getElementById("image" + index);
         page.scrollIntoView();
      }
      this.setState({ isGetDone: true });
   }

   saveLocalBookmark(index) {
      if (this.state.isGetDone) {
         if (index === 0 || this.state.chapter.LinkAnh.length - 1 === index)
            LocalBookmarkApi.remove(this.state.chapter.Id_Chuong);
         else {
            LocalBookmarkApi.save(this.state.chapter.Id_Chuong, index);
         }
      }
   }

   addBookmark() {
      if (!this.state.isSubscribed) {
         BookmarkApi.create(this.state.chapter.Id_Truyen)
            .then(res => {
               this.setState({
                  isSubscribed: !this.state.isSubscribed
               });
               BookmarkApi.updateByChapterId(
                  this.state.chapter.Id_Chuong,
                  this.state.chapter.Id_Truyen
               )
                  .then(res => {
                     this.setState({
                        isBookmarked: true
                     });
                  })
                  .catch(err => {})
                  .finally(() => {
                     Toast.success(
                        `Đã đánh dấu chương ${this.state.chapter.TenChuong}`
                     );
                  });
            })
            .catch(err => {});
      } else {
         BookmarkApi.updateByChapterId(
            this.state.chapter.Id_Chuong,
            this.state.chapter.Id_Truyen
         )
            .then(res => {
               this.setState({
                  isBookmarked: true
               });
            })
            .catch(err => {})
            .finally(() => {
               Toast.success(
                  `Đã đánh dấu chương ${this.state.chapter.TenChuong}`
               );
            });
      }
   }

   checkBookmarked() {
      BookmarkApi.getByComicId(this.state.chapter.Id_Truyen)
         .then(res => {
            if (
               this.state.chapter.Id_Chuong === res.data.Data.Id_ChuongDanhDau
            ) {
               this.setState({
                  isBookmarked: true
               });
            } else {
               this.setState({
                  isBookmarked: false
               });
            }
         })
         .catch(() => {
            this.setState({
               isBookmarked: false
            });
         });
   }

   checkSubscribed() {
      BookmarkApi.getByComicId(this.state.chapter.Id_Truyen)
         .then(res => {
            if (res.data.Data) {
               this.setState({
                  isSubscribed: true
               });
            } else {
               isSubscribed: false;
            }
         })
         .catch(err => {});
   }

   unbookmark() {
      BookmarkApi.delete(this.state.chapter.Id_Truyen).then(res => {
         this.setState({
            isBookmarked: false
         });
         Toast.success(`Đã bỏ theo dõi chương ${this.state.chapter.TenChuong}`);
      });
   }

   render() {
      const {
         chapter,
         allChapters,
         isError,
         isError404,
         isGetDone,
         isSubscribed,
         isBookmarked,
         isLoading
      } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <Progress />;
      }
      return (
         <div className="reading-page-container">
            {!isLoading && isBookmarked && (
               <div className="bookmark-icon-container">
                  <img
                     src="https://freeiconshop.com/wp-content/uploads/edd/bookmark-flat.png"
                     alt="Bookmark"
                     onClick={() => this.unbookmark()}
                  />
                  <p className="bookmark-icon-title">
                     Chương đang được đánh dấu
                  </p>
               </div>
            )}
            {!isLoading && !isBookmarked && (
               <div className="bookmark-icon-container">
                  <img
                     src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698367-icon-19-bookmark-add-512.png"
                     alt="Bookmark"
                     onClick={() => this.addBookmark()}
                  />
                  <p className="bookmark-icon-title">Đánh dấu</p>
               </div>
            )}
            {chapter && (
               <div className="reading-page">
                  <div className="reading-page-header-bar">
                     <span>
                        Truyện {chapter.TenTruyen} - {chapter.TenChuong}
                     </span>
                     <Link
                        to={{
                           pathname: toComicLink(
                              chapter.TenTruyen,
                              chapter.Id_Truyen
                           )
                        }}
                     >
                        <p>Trở về trang chi tiết truyện</p>
                     </Link>
                  </div>
                  {isLoading && <Progress />}

                  {!isLoading &&
                     chapter.LinkAnh.map((c, i) => (
                        <Waypoint
                           key={i}
                           onEnter={v => this.saveLocalBookmark(i)}
                        >
                           <img
                              id={"image" + i}
                              src={c}
                              alt={
                                 this.state.chapter.TenTruyen +
                                 " trang + " +
                                 (i + 1)
                              }
                              onError={e =>
                                 (e.target.src = "../../assets/404.png")
                              }
                           />
                        </Waypoint>
                     ))}

                  <div className="control-bar">
                     {allChapters &&
                        chapter.SoThuTu === allChapters[0].SoThuTu && (
                           <h1>START</h1>
                        )}
                     {allChapters &&
                        chapter.SoThuTu !== allChapters[0].SoThuTu && (
                           <Link
                              to={{
                                 pathname: toChapterLink(
                                    chapter.TenTruyen,
                                    chapter.TenChuong,
                                    allChapters[
                                       allChapters
                                          .map(c => c.SoThuTu)
                                          .indexOf(chapter.SoThuTu) - 1
                                    ].Id
                                 ),
                                 state: {}
                              }}
                           >
                              <p>Previous</p>
                           </Link>
                        )}
                     {allChapters && chapter && (
                        <div>
                           <SearchPage
                              totalPage={allChapters.length}
                              outputPage={
                                 allChapters
                                    .map(c => c.Id)
                                    .indexOf(chapter.Id_Chuong) + 1
                              }
                              allChapters={allChapters}
                              comicName={chapter.TenTruyen}
                           />
                        </div>
                     )}
                     {allChapters &&
                        chapter.SoThuTu !==
                           allChapters[allChapters.length - 1].SoThuTu && (
                           <Link
                              to={{
                                 pathname: toChapterLink(
                                    chapter.TenTruyen,
                                    chapter.TenChuong,
                                    allChapters[
                                       allChapters
                                          .map(c => c.SoThuTu)
                                          .indexOf(chapter.SoThuTu) + 1
                                    ].Id
                                 ),
                                 state: {}
                              }}
                           >
                              <p>Next</p>
                           </Link>
                        )}
                     {allChapters &&
                        chapter.SoThuTu ===
                           allChapters[allChapters.length - 1].SoThuTu && (
                           <h1>END</h1>
                        )}
                  </div>
               </div>
            )}
            {!isLoading && !chapter && (
               <div className="comic-details">
                  <Progress />
               </div>
            )}
         </div>
      );
   }
}
