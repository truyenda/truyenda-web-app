import React, { Component } from "react";
import styles from "./AuthorDetails.scss";
import AuthorApi from "../../api/AuthorApi";
import Progress from "../../components/commonUI/Progress";
import { getIdBySplitingPath, toComicLink } from "../../utils/LinkUtils";
import { Link } from "react-router-dom";

export default class AuthorDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         authorId: null,
         authorName: null,
         authorComics: null,
         isError: false,
         isError404: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "authors/");
         if (!isNaN(id)) {
            AuthorApi.getStories(id)
               .then(res => {
                  let data = res.data.Data;
                  this.setState({
                     authorId: data.Id_TacGia,
                     authorName: data.TenTacGia,
                     authorComics: data.listTruyen
                  });
                  document.title = data.TenTacGia;
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
      const {
         authorId,
         authorName,
         authorComics,
         isError,
         isError404
      } = this.state;
      return (
         <div className="author-details-container">
            {isError || (isError404 && <Progress />)}
            {authorId && authorName && (
               <div className="author-details-header">
                  <img
                     src={`https://ui-avatars.com/api/?name=${authorName}&size=100&font-size=0.25&rounded=true`}
                     alt={authorName}
                  />
                  <p>{authorName}</p>
               </div>
            )}
            {!authorId && <Progress />}
            <div className="author-details-all-comics">
               {authorId &&
                  authorName &&
                  authorComics &&
                  authorComics.map(c => (
                     <Link
                        to={{
                           pathname: toComicLink(c.TenTruyen, c.Id_Truyen)
                        }}
                        key={c.Id_Truyen}
                     >
                        <div className="author-details-item">
                           <img src={c.AnhDaiDien} alt={c.TenTruyen} />
                           <p>{c.TenTruyen}</p>
                        </div>
                     </Link>
                  ))}
               {!authorComics && <Progress />}
            </div>
         </div>
      );
   }
}
