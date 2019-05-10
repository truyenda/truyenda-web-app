import React, { Component } from "react";
import styles from "./AuthorDetails.scss";
import AuthorApi from "../../api/AuthorApi";

export default class AuthorDetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         author: this.props.location.state,
         authorComics: null
      };
   }

   componentDidMount() {
      AuthorApi.
   }

   render() {
      const { author } = this.state;
      console.log(author);
      return (
         <div className="author-details-container">
            <div className="author-details-header" />
            <div className="author-details-all-comics" />
         </div>
      );
   }
}
