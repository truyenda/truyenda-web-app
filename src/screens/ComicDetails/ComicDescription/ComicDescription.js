import React, { Component } from "react";
import styles from "./ComicDescription.scss";

export default class ComicDescription extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      return (
         <div className="comic-description-container">
            <h2>Mô tả chi tiết truyện</h2>
            <div className="comic-description-content">
               <p>{comic.MoTa}</p>
            </div>
            <h2>Trạng thái truyện: <span>{comic.TrangThai}</span></h2>
            {/* <div className="comic-description-show-more">
               <p>Show More</p>
            </div> */}
         </div>
      );
   }
}
