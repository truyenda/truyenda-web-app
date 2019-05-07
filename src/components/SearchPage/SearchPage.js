import React, { Component } from "react";
import styles from "./SearchPage.scss";

export default class SearchPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         totalPage: this.props.totalPage,
         outputPage: this.props.outputPage
      };
   }

   componentWillReceiveProps() {
      this.setState({
         totalPage: this.props.totalPage,
         outputPage: this.props.outputPage
      });
   }

   handleChange(event) {
      this.setState({
         outputPage: event.target.value + this.props.outputPage
      });
   }

   render() {
      const { totalPage, outputPage } = this.state;
      return (
         <div className="search-page-container">
            <div className="search-page-input">
               {outputPage && <input type="text" onChange={e => this.handleChange(e)} placeholder={outputPage} />}
            </div>
            <div className="search-page-total-page">
               {totalPage && <p>/ {totalPage}</p>}
            </div>
         </div>
      );
   }
}
