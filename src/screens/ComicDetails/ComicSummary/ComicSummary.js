import React, { Component } from "react";
import styles from "./ComicSummary.scss";
import ComicGenreTags from "../ComicGenreTags/ComicGenreTags";
import TeamMemApi from "../../../api/TeamMemApi";
import { Link } from "react-router-dom";
import { toTeamLink } from "../../../utils/LinkUtils";

export default class ComicSummary extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comic: this.props.details,
         teams: [],
         isOpen: false
      };
   }

   componentDidMount() {
      TeamMemApi.list(this.state.comic.Id_Nhom)
         .then(res => {
            this.setState({
               teams: res.data.Data.ThanhVienList
            });
         })
         .catch(err => {});
   }

   componentWillReceiveProps() {
      TeamMemApi.list(this.state.comic.Id_Nhom)
         .then(res => {
            this.setState({
               teams: res.data.Data.ThanhVienList
            });   
         })
         .catch(err => {});
   }

   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      const { comic, teams, isOpen } = this.state;
      const showMoreClassName = isOpen
         ? "comic-summary-container-open"
         : "comic-summary-container-close";
      const innerShowMore = isOpen ? "Show Less" : "Show More";
      const originalHeight = document.getElementsByClassName(showMoreClassName);

      const teamListResult =
         teams &&
         teams.map(t => (
            <div className="team-member-item" key={t.Id_TaiKhoanThanhVien}>
               <img
                  src={`https://ui-avatars.com/api/?name=${
                     t.Username
                  }&size=100&font-size=0.25&rounded=true`}
                  alt={t.Username}
               />
               <p>{t.Username}</p>
            </div>
         ));

      return (
         <div className={showMoreClassName}>
            <h2>Tag thể loại</h2>
            <div className="comic-summary-content">
               <ComicGenreTags details={comic} />
            </div>
            <h2 className="comic-group-name">
               Nhóm dịch |
               <Link
                  to={{
                     pathname: toTeamLink(comic.TenNhom, comic.Id_Nhom)
                  }}
               >
                  <span> {comic.TenNhom}</span>
               </Link>
            </h2>
            <div className="comic-summary-content">{teamListResult}</div>
            <div className="comic-summary-show-more">
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
