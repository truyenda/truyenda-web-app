import React, { Component } from "react";
import styles from "./ComicCoverPicture.scss";

export default class ComicCoverPicture extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comicDetails: this.props.details
      };
   }

   render() {
      const { comicDetails } = this.state;
      return (
         <div className="comic-cover-picture-container">
            <img src={comicDetails.ComicCoverPicture} alt="Cover Picture"/>
         </div>
      );
   }
}
