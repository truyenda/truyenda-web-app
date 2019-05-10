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
      pages: 1,
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

  load_manga(){
    ComicApi.list(this.state.pages)
    .then(res => {
      if (res.data.Code && res.data.Code === 200) {
        let man = this.state.mangas;
        if(!man){ man = [] }
        this.setState({
          mangas: man.concat(res.data.Data.listTruyen),
          // mangas: res.data.Data.listTruyen,
          total_mangas: res.data.Data.Paging.TotalRecord
        });
      } else {
        Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
      }
    })
    .catch(err => {
      Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      this.setState({
        isError: true
      });
    }).finally(() => {
      console.log("mangas" + this.state.mangas);
    });
  }

  componentDidMount() {
    
  }

  toggle() {
    let page = this.state.pages;
    if(this.state.mangas.length == 0){
      page = 0;
    }
    this.setState({
      pages: page+1
    },()=>{
      this.load_manga();
    });
  }

  onFilterManga() {
    let term = this.state.filter;
    ComicApi.filter(term)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            mangas: res.data.Data.listTruyen,
            total_mangas: res.data.Data.Paging.TotalRecord,
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
        console.log("filter: " + this.state.mangas);
      });
  }

	render() {
    console.log("page" + this.state.pages);
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
        <div className="_3T_XVY"><h4>{this.state.mangas ? this.state.mangas.length : "0"} mangas</h4></div>
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
        {
          this.state.mangas && this.state.mangas.length == this.state.total_mangas ? ("") :
          (<div className="_1dGlBc">
            <Button
                display={"Load More"}
                type="btn-GrayShow"
                style="_D25dfc"
                onClick={() => {
                  this.toggle();
                }}
            />
          </div>)
        }
      </div>           
		);
	}
}
