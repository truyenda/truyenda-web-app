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
            <div className="comic-overview-picture">
               <img src="https://img.webnovel.com/bookcover/8094015805004305/300/300.jpg?coverUpdateTime=1548301512855" alt={comic.comicTitle}/>
            </div>
            <div className="comic-overview-content">
               <p className="comic-overview-title">{comic.comicTitle}</p>
               <p className="comic-overview-subtitle">{comic.comicAuthors}</p>
               <p className="comic-overview-subtitle">{comic.comicStatus}</p>
            </div>
            <div className="comic-overview-bar">
               <p className="comic-overview-bar-item">Resume</p>
               <p className="comic-overview-bar-item">Chapters</p>
               <p className="comic-overview-bar-item">Favorite</p>
            </div>
         </div>
      );
   }
}
