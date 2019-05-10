import React, { Component } from "react";
import styles from "./ComicAuthors.scss";
import Avatar from "../../../components/commonUI/Avatar/Avatar";
import AuthorApi from "../../../api/AuthorApi";
import { Link } from "react-router-dom";
import { toAuthorLink } from "../../../utils/LinkUtils";

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
      const listAuthors = comic && comic.DanhSachTacGia && comic.DanhSachTacGia.map(author => (
         <Link
            to={{
               pathname: toAuthorLink(author.TenTacGia, author.Id),
               state: {
                  author
               }
            }}
            key={author.Id}
         >
            <div className="comic-author-item">
               <img
                  src={`https://ui-avatars.com/api/?name=${
                     author.TenTacGia
                  }&size=100&font-size=0.25&rounded=true`}
                  alt={author.TenTacGia}
               />
               <p>{author.TenTacGia}</p>
            </div>
         </Link>
      ));
      const showMoreClassName = isOpen
         ? "comic-authors-container-open"
         : "comic-authors-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";
      return (
         <div className={showMoreClassName}>
            <h2>Authors</h2>
            <div className="comic-list-authors">{listAuthors}</div>
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
