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
            <h2>Summary</h2>
            <div className="comic-summary-content">
               <ComicGenreTags details={comic} />
               <ul>
                  <li>
                     Nie Lie uses his past life's knowledge to survive, save the
                     world and his loved ones from the future
                  </li>
                  <li>
                     A fantasy read with elements of time traveling, soul
                     reincarnation and a romantic sub-plot
                  </li>
                  <li>
                     A fantasy read with elements of time traveling, soul
                     reincarnation and a romantic sub-plot
                  </li>
               </ul>
               <ul>
                  <li>
                     Nie Lie uses his past life's knowledge to survive, save the
                     world and his loved ones from the future
                  </li>
                  <li>
                     A fantasy read with elements of time traveling, soul
                     reincarnation and a romantic sub-plot
                  </li>
                  <li>
                     A fantasy read with elements of time traveling, soul
                     reincarnation and a romantic sub-plot
                  </li>
               </ul>
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
