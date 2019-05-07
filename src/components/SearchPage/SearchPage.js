import React, { Component } from "react";
import styles from "./SearchPage.scss";
import { convertToPath } from "../../utils/StringUtils";

export default class SearchPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalPage: this.props.totalPage,
         outputPage: this.props.outputPage,
         allChapters: this.props.allChapters,
         comicName: this.props.comicName
      };
   }

   componentWillReceiveProps() {
      this.setState({
         totalPage: this.props.totalPage,
         outputPage: this.props.outputPage,
         allChapters: this.props.allChapters,
         comicName: this.props.comicName
      });
   }

   handleChange(event) {
      this.setState({
         outputPage: event.target.value + this.props.outputPage
      });
   }

   transform(event) {
      if (event.keyCode == 13) {
         if (
            event.target.value <= this.state.totalPage &&
            event.target.value >= 1
         ) {
            if (this.state.allChapters && this.state.allChapters[event.target.value - 1]) {
               document.location.href = `/chapters/${this.state.allChapters[event.target.value -1].Id}-${convertToPath(this.state.allChapters[event.target.value -1].TenChuong)}-${convertToPath(this.state.comicName)}`;
            }
         } else {
         }
      }
   }

   render() {
      const { totalPage, outputPage } = this.state;
      return (
         <div className="search-page-container">
            <div className="search-page-input">
               {outputPage && (
                  <input
                     type="text"
                     onChange={e => this.handleChange(e)}
                     placeholder={outputPage}
                     onKeyDown={e => this.transform(e)}
                  />
               )}
            </div>
            <div className="search-page-total-page">
               {totalPage && <p>/ {totalPage}</p>}
            </div>
         </div>
      );
   }
}
