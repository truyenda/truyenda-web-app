import React, { Component } from 'react'
import { getIdBySplitingPath } from '../../../utils/LinkUtils';
import { convertToPath } from '../../../utils/StringUtils';

export default class ComicDetailsTable extends Component {
  
   constructor(props){
      super(props);
      this.state = {
         comic: this.props.location.state,
         isError: false,
         isError404: false,
         isExist: false
      }
   }

   componentDidMount() {
     try {
       var url = document.location.href;
       var id = getIdBySplitingPath(convertToPath(url));
       console.log(id);
       if(!isNaN(id)) {
         this.setState({
           isExist: true
         })
       }
     } catch(err) {
       this.setState({
         isError404: true
       });
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
