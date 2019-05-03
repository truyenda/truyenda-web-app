import React, { Component } from "react";
import styles from "./ComicSummary.scss";
import ComicGenreTags from "../ComicGenreTags/ComicGenreTags";

export default class ComicSummary extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         isOpen: false
      };
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      const { comic, isOpen } = this.state;
      const showMoreClassName = isOpen
         ? "comic-summary-container-open"
         : "comic-summary-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";
      const originalHeight = document.getElementsByClassName(showMoreClassName);
      console.log(originalHeight);
      return (
         <div className={showMoreClassName}>
            <h2>Tag thể loại</h2>
            <div className="comic-summary-content">
               <ComicGenreTags details={comic} />
            </div>
            <div className="comic-summary-show-more">
               <p
                  onClick={() => {
                     this.toggle();
                  }}
               >
                  {innerShowMore}
               </p>
            </div>
         </div>
      );
   }
}
