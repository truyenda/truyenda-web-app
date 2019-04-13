import React, { Component } from 'react'
import styles from './ComicAuthors.scss';

export default class ComicAuthors extends Component {
 
   constructor(props) {
      super(props);
      this.state = {
         author: this.props.details
      }
   }

   render() {
    const {author} = this.state;
    return (
      <div className="comic-authors-container">
         <h2>Authors</h2>
         <p>{author}</p>
      </div>
    )
  }
}
