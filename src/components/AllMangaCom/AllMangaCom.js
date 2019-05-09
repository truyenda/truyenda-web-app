import React, { Component } from "react";
import Manga from './Manga';
import styles from "./AllMangaCom.scss";
import Button from "../commonUI/Button";
import Caller from '../../utils/APICaller';
import LatestFilter from "../Manga/LatestFilter";
import ComicApi from "../../api/ComicApi";
import Toast from "../commonUI/Toast";
import Progress from "../commonUI/Progress";
export default class AllMangaCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangas: null,
      filter: [],
      total_mangas: 0,
      inProgress: false
    };
  }

  receive(filter){
    this.setState({
      filter
    },()=>{
      console.log(this.state.filter);
      // console.log(filter);
      this.setState({ inProgress: true });
      this.onFilterManga();
    });
    
  }

  componentDidMount() {
    ComicApi.list(1)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data.listTruyen,
            pages: res.data.Data.Paging.TotalPages,
            total_mangas: res.data.Data.Paging.TotalRecord
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
            pages: res.data.Data.Paging.TotalPages,
            inProgress: false
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
    if(this.state.mangas) {
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
    }
		return (
      <div>
        <h1 className="title_all_manga">All Manga</h1>
        <LatestFilter onSubmit ={(value)=> this.receive(value)} />
        <div className="_3T_XVY"><h4>{this.state.total_mangas} mangas</h4></div>
        {this.state.inProgress || !this.state.mangas ? (
            <Progress display="Đang load truyện..." />
          ) : (
            ""
          )}
        { this.state.mangas && this.state.mangas.length < 1 && (
          <div className="not_manga">Không có truyện yêu cầu!</div>
        )}
        <div className="all_manga">
          {elements_mangas}
        </div>
      </div>           
		);
	}
}
