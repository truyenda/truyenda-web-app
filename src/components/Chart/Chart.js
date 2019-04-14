import React, { Component } from "react";
import styles from "./Chart.scss";
import demo from "../../assets/demo.jpg";
import { Link } from "react-router-dom";
export default class Chart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // avatars: [
         //    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png",
         //    "http://www.sclance.com/pngs/avatar-icon-png/avatar_icon_png_70847.jpg",
         //    "https://ya-webdesign.com/images/girl-avatar-png-19.png",
         //    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg",
         //    "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9475211889067.562541caf0859.png"
         // ],
         comics: [
            {
               comicId: 1,
               comicNumberOfChapters: 17,
               comicTitle: "1 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://f01.mrcdn.info/file/mrportal/i/1/e/6/Al.4h0QHNU9.jpg",
               comicAuthorAvatar: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png"
            },
            {
               comicId: 2,
               comicNumberOfChapters: 4,
               comicTitle: "2 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://f01.mrcdn.info/file/mrportal/i/1/e/6/Al.4h0QHNU9.jpg",
               comicAuthorAvatar: "http://www.sclance.com/pngs/avatar-icon-png/avatar_icon_png_70847.jpg"
            },
            {
               comicId: 3,
               comicNumberOfChapters: 8,
               comicTitle: "3 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  `https://f01.mrcdn.info/file/mrportal/i/1/e/6/Al.4h0QHNU9.jpg`,
               comicAuthorAvatar: "https://ya-webdesign.com/images/girl-avatar-png-19.png"
            },
            {
               comicId: 4,
               comicNumberOfChapters: 30,
               comicTitle: "4 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://f01.mrcdn.info/file/mrportal/i/1/e/6/Al.4h0QHNU9.jpg",
               comicAuthorAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg"
            },
            {
               comicId: 5,
               comicNumberOfChapters: 2,
               comicTitle: "5 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://f01.mrcdn.info/file/mrportal/i/1/e/6/Al.4h0QHNU9.jpg",
               comicAuthorAvatar: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9475211889067.562541caf0859.png"
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
