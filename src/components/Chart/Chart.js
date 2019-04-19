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
               comicView: 35590,
               comicGenres: [
                  "Fiction",
                  "Comedy",
                  "Detective",
                  "Romantic",
                  "Youth",
                  "Manga"
               ],
               comicNumberOfChapters: 17,
               comicTitle: "1 Tales of Demons and Gods",
               comicAuthors: "Mad Snail, Jiang Ruotai",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://f01.mrcdn.info/file/mrportal/i/1/e/6/Al.4h0QHNU9.jpg",
               comicAvatarPicture:
                  "https://img.webnovel.com/bookcover/8094015805004305/300/300.jpg?coverUpdateTime=1548301512855",
               comicAuthorAvatar:
                  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ce54bf11889067.562541ef7cde4.png"
            },
            {
               comicId: 2,
               comicView: 32884,
               comicGenres: [
                  "Fiction",
                  "Comedy",
                  "Detective",
                  "Romantic",
                  "Youth",
                  "Manga",
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G"
               ],
               comicNumberOfChapters: 4,
               comicTitle: "The Last Human",
               comicAuthors: "Manyu",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://www.cartoonbrew.com/wp-content/uploads/2019/02/lasthuman_main.jpg",
               comicAvatarPicture: "https://www.cartoonbrew.com/wp-content/uploads/2019/02/lasthuman_bookcover.jpg",
               comicAuthorAvatar:
                  "https://www.cartoonbrew.com/wp-content/uploads/2019/02/lasthuman_bookcover.jpg"
            },
            {
               comicId: 3,
               comicView: 29061,
               comicGenres: [
                  "Fiction",
                  "Comedy",
                  "Detective",
                  "Romantic",
                  "Youth",
                  "Manga"
               ],
               comicNumberOfChapters: 8,
               comicTitle: "One Piece",
               comicAuthors: "Eiichiro Oda",
               comicStatus: "Ongoing",
               comicCoverPicture: `https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcJTdjtktMdh6m8AhJtGzjcBQlBuElg62IYoML9TIiBwdjoC0rhzFG6pQwboB15yyjja3KW3wsRTQSjFNikG4NZvcAtwgLoevdtnikz67kYwiPCcbOgu45gB898T7vYAwkHcage5GQsSxsy.4HUbTsPJq9dTR2ciyyiMRAUmOe51Y-&h=1080&w=1920&format=jpg`,
               comicAvatarPicture: "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/One_Piece_DVD_18.png/200px-One_Piece_DVD_18.png",
               comicAuthorAvatar:
                  "https://ya-webdesign.com/images/girl-avatar-png-19.png"
            },
            {
               comicId: 4,
               comicView: 23985,
               comicGenres: [
                  "Fiction",
                  "Comedy",
                  "Detective",
                  "Romantic",
                  "Youth",
                  "Manga"
               ],
               comicNumberOfChapters: 30,
               comicTitle: "The Rising of the Shield Hero",
               comicAuthors: "Kyu Aiya, Yusagi Aneko",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://res.cloudinary.com/sfp/image/upload/c_fill,q_60,h_750,w_1920/oth/FunimationStoreFront/1899700/Latvian/1899700_Latvian_ShowDetailHeaderDesktop_09a8faf6-a013-e911-8175-020165574d09.jpg",
               comicAvatarPicture: "https://prodimage.images-bn.com/pimages/9781935548706_p0_v1_s550x406.jpg",
               comicAuthorAvatar:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg"
            },
            {
               comicId: 5,
               comicView: 20080,
               comicGenres: [
                  "Fiction",
                  "Comedy",
                  "Detective",
                  "Romantic",
                  "Youth",
                  "Manga"
               ],
               comicNumberOfChapters: 2,
               comicTitle: "One Punch-Man",
               comicAuthors: "Yusuke Murata, ONE",
               comicStatus: "Ongoing",
               comicCoverPicture:
                  "https://dw9to29mmj727.cloudfront.net/promo/2016/5256-SeriesHeaders_OPM_2000x800.jpg",
               comicAvatarPicture: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5710/5710418_sa.jpg;maxHeight=640;maxWidth=550",
               comicAuthorAvatar:
                  "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a9475211889067.562541caf0859.png"
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
            key={comic.comicId}
         >
            <div className="chart-item">
               <p className="rank">{comic.comicId}</p>
               <img className="img" src={comic.comicAvatarPicture} />
               <div className="content">
                  <p className="name-title">{comic.comicTitle}</p>
                  <p className="side-title">{comic.comicAuthors}</p>
                  <p className="status-title">{comic.comicStatus} | {comic.comicView} views</p>
               </div>
            </div>
         </Link>
      ));
      return <div className="chart-wrapper">{listComics}</div>;
   }
}
