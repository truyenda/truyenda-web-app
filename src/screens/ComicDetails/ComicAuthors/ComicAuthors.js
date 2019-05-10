import React, { Component } from "react";
import styles from "./ComicAuthors.scss";
import Avatar from "../../../components/commonUI/Avatar/Avatar";
import AuthorApi from "../../../api/AuthorApi";

export default class ComicAuthors extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         isOpen: false
      };
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      const { comic, isOpen } = this.state;
      const listAuthors = comic.DanhSachTacGia.map(a => (
         <div className="comic-author-item" key={a.Id}>
            <img src="https://www.seekpng.com/png/small/514-5147412_default-avatar-icon.png" alt={a.TenTacGia}/>
            <p>{a.TenTacGia}</p>
         </div>
      ))
      const showMoreClassName = isOpen
         ? "comic-authors-container-open"
         : "comic-authors-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";
      return (
         <div className={showMoreClassName}>
            <h2>Authors</h2>
            <div className="comic-list-authors">
               {listAuthors}
            </div>
            <div className="comic-authors-show-more">
               <p
                  onClick={() => {
                     this.toggle();
                  }}
               >
                  {innerShowMore}
               </p>
            </div>
         </div>
      );
   }
}
