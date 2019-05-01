import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";
import { getIdBySplitingPath } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";

export default class ReadingPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: null,
         isError: false,
         isError404: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "comics/read/");
         if (!isNaN(id)) {
            ComicApi.get(id)
               .then(res => {
                  this.setState({
                     comic: res.data.Data
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
      const { comic, isError, isError404 } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <span>Có lỗi xảy ra trong quá trình kết nối</span>;
      }
      return (
         <div className="reading-page-container">
            {comic && (
               <div className="reading-page">
                  <img src={comic.AnhBia} alt="Page" />
                  <img src={comic.AnhBia} alt="Page" />
                  <img src={comic.AnhBia} alt="Page" />
                  <img src={comic.AnhBia} alt="Page" />
                  <img src={comic.AnhBia} alt="Page" />
                  <img src={comic.AnhBia} alt="Page" />
               </div>
            )}
            {!comic && (
               <div className="comic-details">
                  Nothing to show 
               </div>
            )}
         </div>
      );
   }
}
