import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";
import { getIdBySplitingPath } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import ChapterApi from "../../api/ChapterApi";
import Progress from "../../components/commonUI/Progress";

export default class ReadingPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chapter: null,
         isError: false,
         isError404: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "chapters/");
         if (!isNaN(id)) {
            ChapterApi.get(id)
               .then(res => {
                  this.setState({
                     chapter: res.data.Data
                  });
                  document.title = res.data.Data.TenTruyen;
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
      const { chapter, isError, isError404 } = this.state;
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
                     <img src={c} alt="" />
                  ))}
               </div>
            )}
            {!chapter && <div className="comic-details">Nothing to show</div>}
         </div>
      );
   }
}
