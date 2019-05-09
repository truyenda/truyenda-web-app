import React, { Component } from 'react';
import styles from './Manga.scss';
import LatestList from './LatestList';
import Button from '../commonUI/Button';
import ChapterApi from '../../api/ChapterApi';
import Toast from '../commonUI/Toast';
import Progress from '../commonUI/Progress';


export default class Manga extends Component {
  constructor(props) {
    super(props);
    this.state = {
       mangas: null,
       total_mangas: 0
    };
  }

  componentDidMount() {
    ChapterApi.list_latest()
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data.listNewChuong,
            total_mangas: res.data.Data.Paging.TotalRecord
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
    if(this.state.mangas){
      var elements_mangas = this.state.mangas.map((manga, index) => {
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
      <div className="main-wrappers">
        <h1 className="_3kDZW">Latest Update</h1>
        <div className="_3_XVY"><h4>{this.state.total_mangas} mangas</h4></div>
        <div className="_3X8sC">
          <div className="qjYVyl">Manga</div>
          <div className="qjYVym">New chapters</div>
          <div className="qjYVyr">Date updated</div>
        </div>
        {!this.state.mangas ? (
            <Progress display="Đang load truyện..." />
          ) : (
            ""
          )}
        { elements_mangas }
      </div>
    )
  }
}
