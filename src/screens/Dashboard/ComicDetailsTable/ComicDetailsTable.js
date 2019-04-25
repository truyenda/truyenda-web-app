import React, { Component } from 'react'

export default class ComicDetailsTable extends Component {
  
   constructor(props){
      super(props);
      this.state = {
         comic: this.props.location.state
      }
   }

   render() {
   const { comic } = this.state.comic;
    return (
      <div className="comic-details-table-container">
        <h3>{comic.TenTruyen}</h3>
        <p>List Of Chapter</p>
      </div>
    )
  }
}
