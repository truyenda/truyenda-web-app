import React, { Component } from "react";
import styles from "./ComicSummary.scss";

export default class ComicSummary extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }

   render() {
      const { comic } = this.state;
      return (
         <div className="comic-summary-container">
            <h2>Summary</h2>
            <div className="comic-summary-content">
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
               <p>Show more</p>
            </div>
         </div>
      );
   }
}
