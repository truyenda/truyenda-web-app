import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";

export default class ReadingPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.location.state
      };
   }

   render() {
      const {comic} = this.state.comic;
      return (
         <div className="reading-page-container">
            <div className="reading-page">
               <img
                  src={comic.AnhBia}
                  alt="Page"
               />
               <img
                  src={comic.AnhBia}
                  alt="Page"
               />
               <img
                  src={comic.AnhBia}
                  alt="Page"
               />
               <img
                  src={comic.AnhBia}
                  alt="Page"
               />
               <img
                  src={comic.AnhBia}
                  alt="Page"
               />
               <img
                  src={comic.AnhBia}
                  alt="Page"
               />
            </div>
         </div>
      );
   }
}
