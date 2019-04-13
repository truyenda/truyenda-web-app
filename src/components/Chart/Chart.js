import React, { Component } from "react";
import styles from "./Chart.scss";
import demo from "../../assets/demo.jpg";
import { Link } from "react-router-dom";
export default class Chart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         comics: [
            {
               comicId: 1,
               comicTitle: "1 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://via.placeholder.com/1500x500?text=Update%20soon"
            },
            {
               comicId: 2,
               comicTitle: "2 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://via.placeholder.com/1500x500?text=Update%20soon"
            },
            {
               comicId: 3,
               comicTitle: "3 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://via.placeholder.com/1500x500?text=Update%20soon"
            },
            {
               comicId: 4,
               comicTitle: "4 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://via.placeholder.com/1500x500?text=Update%20soon"
            },
            {
               comicId: 5,
               comicTitle: "5 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://via.placeholder.com/1500x500?text=Update%20soon"
            }
         ]
      };
   }

   render() {
      const { comics } = this.state;
      const listComics = comics.map(comic => (
         <Link
            to={{
               pathname: "/comics/" + comic.comicId,
               state: {
                  comic
               }
            }}
            key={comic.comicId}>
            <div className="chart-item">
               <p className="rank">{comic.comicId}</p>
               <img className="img" src={demo} />
               <div className="content">
                  <p className="name-title">{comic.comicTitle}</p>
                  <p className="side-title">{comic.comicAuthors}</p>
                  <p className="status-title">{comic.comicStatus}</p>
               </div>
            </div>
         </Link>
      ));
      return <div className="chart-wrapper">{listComics}</div>;
   }
}
