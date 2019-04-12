import React, { Component } from "react";
import ComicCoverPicture from "./ComicCoverPicture/ComicCoverPicture";
export default class ComicDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comicDetails: {
               comicTitle: 'Tales of Demons and Gods',
               comicAuthors: 'Mad Snail, Jiang Ruotai',
               comicStatus: 'Ongoing',
               comicCoverPicture: 'https://via.placeholder.com/1500x500?text=Update%20soon'
         }
      };
   }

   render() {
      return (
         <div className="comic-detail-container">
            <ComicCoverPicture details={this.state.comicDetails}/>
            <p>2911</p>
            {/* <ComicOvervire />
        <ComicSummary />
        <ComicDescription />
        <ComicStats />
        <ComicAuthors />
        <ComicChapters /> */}
         </div>
      );
   }
}

/*

TASK

1. responsive layout (just 2 - 768 and full)
      1.1. mobile first max-768
      1.2. full

2. components
      2.1. cover picture
      2.2. comic overview
         2.2.1. comic picture
         2.2.2. comic intro content
         2.2.3. (update later) favorite
      2.3. summary
      2.4. description
      2.5. stats
      2.6. authors
      2.7. (update later) other facts8.
      2.8. chapter
      
3. Update all in Vietnamese

*/
