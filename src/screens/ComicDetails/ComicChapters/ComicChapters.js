import React, { Component } from 'react'
import styles from './ComicChapters.scss';

/*
TODO: 
  1. Add attribute comicNumberOfChapters
  2. Render as list 
  3. Add attribute comicGenres
  4. Render as tag
  5. Combine Author component into Description 

*/
export default class ComicChapters extends Component {
  render() {
    return (
      <div className="comic-chapters-container">
         <h2>Chapters</h2>
         <p>10</p>
         <p>9</p>
         <p>8</p>
         <p>7</p>
         <p>6</p>
         <p>5</p>
         <p>4</p>
         <p>3</p>
         <p>2</p>
         <p>1</p>
      </div>
    )
  }
}
