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
            <h2>Description</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, rem, itaque ad sapiente hic delectus ipsum amet corrupti, eum laboriosam molestiae perferendis cum. Aspernatur consequuntur, ad amet labore numquam sint?</p>
            <h2>{comic.comicStatus}</h2>
         </div>
      );
   }
}
