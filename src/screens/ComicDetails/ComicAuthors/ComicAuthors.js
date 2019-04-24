import React, { Component } from "react";
import styles from "./ComicAuthors.scss";
import Avatar from "../../../components/commonUI/Avatar/Avatar";

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
      const showMoreClassName = isOpen
         ? "comic-authors-container-open"
         : "comic-authors-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";
      return (
         <div className={showMoreClassName}>
            <h2>Authors</h2>
            <p>{comic.comicAuthors}</p>
            <div className="comic-list-authors">
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
               <Avatar src={comic.comicAuthorAvatar} />
            </div>
            <div className="comic-authors-show-more">
               <p
                  onClick={ () => {
                     this.toggle();
                  }}
               >{innerShowMore}</p>
            </div>
         </div>
      );
   }
}
