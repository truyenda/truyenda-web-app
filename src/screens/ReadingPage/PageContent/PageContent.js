import React, { Component } from "react";

export default class PageContent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chapter: this.props.chapter
      };
   }

   render() {
      const {chapter} = this.state.chapter;
      return (
         <div className="reading-page-content-container">
            <p>Chapter {chapter.Id}</p>
            {chapter.LinkAnh.split(",").map(c => (
               <img key={c} src={c} alt="" />
            ))}
         </div>
      );
   }
}
