import React, { Component } from "react";
import styles from "./ComicChapters.scss";

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
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      const chapterIndexes = [...Array(comic.comicNumberOfChapters).keys()];

      const listChapters = chapterIndexes.map(index => (
         <div className="comic-chapters-item" key={index}>
            <p className="comic-chapters-item-left">Chapter {index}</p>
            <p className="comic-chapters-item-right">April 23, 2019</p>
         </div>
      ));

      return (
         <div className="comic-chapters-container">
            <h2>Chapters</h2>
            <div className="comic-chapters-wrapper">{listChapters}</div>
            <div className="comic-chapters-show-more">
               <p>Show more >></p>
            </div>
         </div>
      );
   }
}
