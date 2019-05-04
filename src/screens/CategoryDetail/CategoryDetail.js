import React, { Component } from "react";
import { getIdBySplitingPath } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import Progress from "../../components/commonUI/Progress";

export default class CategoryDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         genre: this.props.location.state,
         comic: null,
         isError: false,
         isError404: false
      };
   }

   componentDidMount() {
      try {
         var url = document.location.href;
         var id = getIdBySplitingPath(url, "categories/");
         if (!isNaN(id)) {
            ComicApi.getByCategory(id)
               .then(res => {
                  this.setState({
                     comic: res.data.Data
                  });
                  document.title = res.data.Data.TenTruyen;
               })
               .catch(err => {
                  this.setState({
                     isError: true
                  });
               });
         }
      } catch (err) {
         this.setState({
            isError404: true
         });
      }
   }

   render() {
      const { genre, comic, isError, isError404 } = this.state;
      if (isError404) {
         return <NotFound />;
      }
      if (isError) {
         return <Progress display="Please wait..." />;
      }
      return (
         <div className="category-detail-container">
            <p>{genre.TenLoaiTruyen}</p>
            {comic &&
               comic.forEach(c => (
                  <div>
                     <p>{c.TenTruyen}</p>
                  </div>
               ))}
         </div>
      );
   }
}
