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
       total_mangas: 0,
       pages: 1
    };
  }

  load_manga(){
    ChapterApi.list_latest(this.state.pages)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          let man = this.state.mangas;
          if(!man){ man = [] }
          this.setState({
            mangas: man.concat(res.data.Data.listNewChuong),
            total_mangas: res.data.Data.Paging.TotalRecord,
            pages: res.data.Data.Paging.CurrentPage
          });
        } else {
          Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
        console.log(err)
      });
  }

  componentDidMount() {
    console.log("com");
    this.load_manga();
  }

  toggle() {
    this.setState({
      pages: this.state.pages + 1
    },()=>{
      this.load_manga();
    });
  }

  render() {
    console.log(this.state.pages);
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
        <h1 className="_3kDZW">Cập nhật mới nhất</h1>
        <div className="_3_XVY"><h4>{this.state.total_mangas} truyện</h4></div>
        <div className="_3X8sC">
          <div className="qjYVyl">Truyện</div>
          <div className="qjYVym">Những chương mới</div>
          <div className="qjYVyr">Ngày cập nhật</div>
        </div>
        {!this.state.mangas ? (
            <Progress display="Đang load truyện..." />
          ) : (
            ""
          )}
        { elements_mangas }
        {
          this.state.mangas && this.state.mangas.length == this.state.total_mangas ? ("") :
          (<div className="_1dGlB">
            <Button
                display={"Show more"}
                type="btn-GrayShow"
                style="_D25df"
                onClick={() => {
                  this.toggle();
                }}
            />
          </div>)
        }
      </div>
    )
  }
}
