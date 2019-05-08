import React, { Component } from 'react'
import styles from './Main.scss';
import { Link } from "react-router-dom";
import Toast from '../commonUI/Toast';
import ComicApi from '../../api/ComicApi';
import Manga from '../AllMangaCom/Manga';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangas: []
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
  }

  render() {
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
    return (
      <div className="main-wrapper">
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
    )
  }
}
