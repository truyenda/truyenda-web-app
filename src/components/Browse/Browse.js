import React, { Component } from "react";
import styles from "./Browse.scss";
import Button from "../commonUI/Button";
import Caller from "../../utils/APICaller";
import { Link } from "react-router-dom";
import { toCategoryDetailLink } from "../../utils/LinkUtils";
const MAX_ITEMS = 14;
export default class Browse extends Component {
   constructor(props) {
      super(props);
      this.state = {
         genres: [],
         isOpen: false
      };
   }

   componentDidMount() {
      Caller("categories").then(res => {
         this.setState({
            genres: res.data.Data
         });
      });
   }

   toggle() {
      this.setState({ isOpen: !this.state.isOpen });
   }

   getRenderedItems() {
      if (this.state.isOpen) {
         return this.state.genres;
      }
      return this.state.genres.slice(0, MAX_ITEMS);
   }

   render() {
      const { genres } = this.state;
      const elements_genres = this.getRenderedItems().map((genre, index) => {
         return (
            <div key={genre.Id} className="_d5D78">
               <Link
                  to={{
                     pathname: toCategoryDetailLink(
                        genre.TenLoaiTruyen,
                        genre.Id
                     ),
                     state: {
                        genre
                     }
                  }}
               >
                  {genre.TenLoaiTruyen}
               </Link>
            </div>
         );
      });
      return (
         <div className="browse-wrapper">
            <p className="title">Browse By Genres</p>
            <div className="browse">
               <div className="col">{elements_genres}</div>
            </div>
            <div className="_1dGlB">
               <Button
                  display={this.state.isOpen ? "Show less" : "Show more"}
                  type="btn-GrayShow"
                  style="_D25df"
                  onClick={() => {
                     this.toggle();
                  }}
               />
            </div>
         </div>
      );
   }
}
