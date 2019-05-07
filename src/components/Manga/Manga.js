import React, { Component } from 'react';
import styles from './Manga.scss';
import LatestList from './LatestList';
import LatestFilter from './LatestFilter';
import Button from '../commonUI/Button';
import ChapterApi from '../../api/ChapterApi';
import Toast from '../commonUI/Toast';


export default class Manga extends Component {
  constructor(props) {
    super(props);
    this.state = {
       mangas: []
    };
  }

  componentDidMount() {
    ChapterApi.list_latest()
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data
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
    var elements_mangas = this.state.mangas.map((manga, index) => {
      return  <div key={ manga.Id } className="alternative_cls">
                <LatestList
                  title={ manga.TenTruyen }
                  // count_new_chapter={ manga.TenChuong }
                  new_chapter={ manga.TenChuong }
                  date_update= { manga.NgayTao }
                />
              </div>

    });
    return (
      <div className="main-wrappers">
        <h1 className="_3kDZW">Latest Update</h1>
        <LatestFilter />
        <div className="_3_XVY"><h4>521 manga</h4></div>
        <div className="_3X8sC">
          <div className="qjYVyl">Manga</div>
          <div className="qjYVym">New chapters</div>
          <div className="qjYVyr">Date updated</div>
        </div>
        { elements_mangas }
      </div>
    )
  }
}
