import "./ThumbToolTip.scss";
import React, { Component } from "react";
import ComicApi from "../../api/ComicApi";
import Photo from "../../components/commonUI/Photo";
class ThumbToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    ComicApi.get(this.props.Id)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({ data: res.data.Data });
        } else {
          this.setState({ data: null });
        }
      })
      .catch(err => {
        this.setState({ data: null });
      });
  }
  render() {
    if (!this.state.data || !this.state.data.TenTruyen) {
      return <div>Lỗi không thể lấy dữ liệu</div>;
    }
    return (
      <div className="tip-wrap">
        {this.props.showImg && (
          <Photo className="thumb-tip" src={this.state.data.AnhDaiDien} />
        )}
        <div className="meta-tip">
          <span>{this.state.data.TenTruyen}</span>
          <p>{this.state.data.MoTa}</p>
        </div>
      </div>
    );
  }
}

export default ThumbToolTip;
