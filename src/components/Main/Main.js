import React, { Component } from 'react'
import styles from './Main.scss';
import { Link } from "react-router-dom";
import Toast from '../commonUI/Toast';
import ComicApi from '../../api/ComicApi';
import Manga from '../AllMangaCom/Manga';
import CategoryDetail from '../../screens/CategoryDetail/CategoryDetail';
import Progress from '../commonUI/Progress';
import LatestList from '../Manga/LatestList';
import ChapterApi from '../../api/ChapterApi';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangas: null,
      manga_latest: null
    };
  }

  componentDidMount() {
    ComicApi.listTrending()
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data
          });
        } else {
          Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          this.setState({
            isError: true
          });
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
        this.setState({
          isError: true
        });
      });
    ChapterApi.list_latest()
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            manga_latest: res.data.Data.listNewChuong
          });
        } else {
          Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      });
  }

  render() {
    if(this.state.mangas && this.state.manga_latest){
      var elements_mangas = this.state.mangas.map((manga, index) => {
        return  <div key={ index }>
                  <Manga
                    id_truyen = {manga.Id}
                    ten={manga.TenTruyen}
                    anhbia={manga.AnhDaiDien}
                    trangthai={manga.TrangThai}
                    tacgia={[...manga.DanhSachTacGia].map(e => e.TenTacGia).join(",")}
                  />
                </div>
  
      });
      var elements_mangas_latest = this.state.manga_latest.map((manga, index) => {
        return  <div key={ manga.Id_Truyen } className="alternative_cls">
                  <LatestList
                    id_chuong = {manga.Id_Chuong}
                    id_truyen = {manga.Id_Truyen}
                    image_manga = {manga.AnhDaiDien}
                    title={ manga.TenTruyen }
                    // count_new_chapter={ manga.TenChuong }
                    new_chapter={ manga.TenChuong }
                    date_update= { manga.NgayTao }
                  />
                </div>
  
      }); 
    }
    return (
      <div>
        <div className="main-wrapper">
          { !this.state.mangas ? (
            <Progress display="Đang load truyện..." />
          ) : (
            ""
          )}
          <div className="few-hours">In the last few hours</div>
          <div>
            <div className="tilte-trending">Trending Updates</div>
            <div className="view-all">
              <Link to="/all-manga">View all</Link>
            </div>
          </div>
          <div className="all_manga">
            {elements_mangas}
          </div>
        </div>
        <div className="main-wrapper wrapper-latest">
          <div className="title-latest">
            <div className="tilte-trending">LATEST UPDATE</div>
            <div className="view-all">
              <Link to="/latest-update">View all</Link>
            </div>
          </div>
          <div className="_3X8sC">
            <div className="qjYVyl">Manga</div>
            <div className="qjYVym">New chapters</div>
            <div className="qjYVyr">Date updated</div>
          </div>
          { !this.state.mangas ? (
            <Progress display="Đang load truyện..." />
          ) : (
            ""
          )}
          {elements_mangas_latest}
        </div>
      </div>
    )
  }
}
