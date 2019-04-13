import React, { Component } from "react";
import styles from "./ComicOverview.scss";

export default class ComicOverview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      return (
         <div className="comic-overview-container">
            <h2>Overview</h2>
            <p>{comic.comicTitle}</p>
            <p>{comic.comicStatus}</p>
            <p>{comic.comicAuthors}</p>
         </div>
      );
   }
}
