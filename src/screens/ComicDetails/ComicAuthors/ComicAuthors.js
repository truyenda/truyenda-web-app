import React, { Component } from "react";
import styles from "./ComicAuthors.scss";
import Avatar from "../../../components/commonUI/Avatar/Avatar";

export default class ComicAuthors extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }

   render() {
      const { comic } = this.state;
      return (
         <div className="comic-authors-container">
            <h2>Authors</h2>
            <p>{comic.comicAuthors}</p>
            <div className="comic-list-authors">
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
            </div>
            <div className="comic-authors-show-more">
               <p>Show more</p>
            </div>
         </div>
      );
   }
}
