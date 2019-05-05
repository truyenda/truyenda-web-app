import React, { Component } from "react";
import Manga from './Manga';
import styles from "./AllMangaCom.scss";
import Button from "../commonUI/Button";
import Caller from '../../utils/APICaller';
import LatestFilter from "../Manga/LatestFilter";
import ComicApi from "../../api/ComicApi";
export default class AllMangaCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangas: []
    };
  }

  componentDidMount() {
    ComicApi.list(1)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data.listTruyen,
            pages: res.data.Data.Paging.TotalPages
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

  onFilterManga() {
    let term = this.state.filter;
    ComicApi.filter(term)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data.listTruyen,
            pages: res.data.Data.Paging.TotalPages
          });
        } else {
          Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }


	render() {
    var elements_mangas = this.state.mangas.map((manga, index) => {
      return  <div key={ index }>
                <Manga
                  ten={manga.TenTruyen}
                  anhbia={manga.AnhDaiDien}
                  trangthai={manga.TrangThai}
                  tacgia={[...manga.DanhSachTacGia].map(e => e.TenTacGia).join(",")}
                />
              </div>

    });
		return (
      <div>
        <h1 className="title_all_manga">All Manga</h1>
        <LatestFilter onClick={() => {this.onFilterManga()}} />
        <div className="all_manga">
          {elements_mangas}
        </div>
      </div>           
		);
	}
}
