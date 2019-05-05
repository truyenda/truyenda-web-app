import React, { Component } from "react";
import styles from "./ComicGenreTags.scss";
import { toCategoryDetailLink } from "../../../utils/LinkUtils";
import { Link } from "react-router-dom";

export default class ComicGenreTags extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details
      };
   }
   render() {
      const { comic } = this.state;
      const listGenres = comic.DanhSachTheLoai.map(genre => (
         <Link to={{
                  pathname:toCategoryDetailLink(genre.TenTheLoai, genre.Id),state: { genre }
               }}
               key={genre.Id}
         >
            {genre.TenTheLoai}
         </Link>
      ));
      return (
         <div className="comic-genre-tags-container">
            <div className="comic-genre-tags-item">
               {listGenres}
            </div>
         </div>   
         //TODO: Add Tag label
      );
   }
}
