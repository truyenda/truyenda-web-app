import React, { Component } from "react";
import styles from "./ComicGenreTags.scss";

export default class ComicGenreTags extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      const listGenres = comic.comicGenres.map(genre => (
         <a href="#">{genre}</a>
      ));
      return (
         <div className="comic-genre-tags-container">
            <div className="comic-genre-tags-item">
               {listGenres}
            </div>
         </div>
         //TODO: Add Tag label
      );
   }
}
