import React, { Component } from "react";
import ComicCoverPicture from "./ComicCoverPicture/ComicCoverPicture";
import styles from "./ComicDetails.scss";
import ComicOverview from "./ComicOverview/ComicOverview";
import ComicSummary from "./ComicSummary/ComicSummary";
import ComicDescription from "./ComicDescription/ComicDescription";
import ComicAuthors from "./ComicAuthors/ComicAuthors";
import ComicChapers from "./ComicChapters/ComicChapters";
import ComicApi from "../../api/ComicApi";
import { toComicLink, getIdBySplitingPath } from "../../utils/LinkUtils";
import { convertToPath } from "../../utils/StringUtils";
import NotFound from "../Error/NotFound";
import Progress from "../../components/commonUI/Progress";
export default class ComicDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: null,
         isError: false,
         isError404: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, 'comics/');
         if (!isNaN(id)) {
            ComicApi.get(id)
               .then(res => {
                  this.setState({
                     comic: res.data.Data
                  });
                  document.title = res.data.Data.TenTruyen;
               })
               .catch(err => {
                  this.setState({
                     isError: true
                  });
               });
         }
      } catch (err) {
         this.setState({ isError404: true });
      }
   }

   render() {
      const { comic, isError, isError404 } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <Progress />;
      }
      return (
         <div className="comic-in-details">
            {comic && (
               <div className="comic-detail-container">
                  <ComicCoverPicture details={comic.AnhBia} />
                  <ComicOverview details={comic} />
                  <div className="comic-detail-row">
                     <div className="comic-detail-row-left">
                        <div className="comic-detail-row-left-summary">
                           <ComicSummary details={comic} />
                        </div>
                        <div className="comic-detail-row-left-item-authors">
                           <ComicAuthors details={comic} />
                        </div>
                     </div>
                     <div className="comic-detail-row-right">
                        <ComicDescription details={comic} />
                     </div>
                  </div>
                  {/* <ComicAuthors details={comic} /> */}
                  <ComicChapers details={comic} />

                  {/* <ComicStats /> */}
               </div>
            )}
            {!comic && (
               <div className="comic-details">
                  <Progress />
               </div>
            )}
         </div>
      );
   }
}