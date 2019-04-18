import React, { Component } from "react";
import "./Error.scss";
import ErrorImg from "../../assets/403.png";
import Button from "../../components/commonUI/Button";
import { Link } from "react-router-dom";
class AccessDenied extends Component {
  componentDidMount() {
    document.title = "Trang bị hạn chế truy cập";
  }
  render() {
    return (
      <div className="error-container">
        <div className="error-img">
          <img src={ErrorImg} />
        </div>
        <span>Xin lỗi! Bạn không đủ quyền để truy cập trang này ☢</span>
        <Link className="link-to-home" to="/">
          <Button display="Trang chủ" style="btn-back-home" />
        </Link>
      </div>
    );
  }
}

export default AccessDenied;
