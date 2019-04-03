import React, { Component } from "react";
import "./Error.scss";
import ErrorImg from "../../assets/404.png";
import Button from "../../components/commonUI/Button";
import {Link} from 'react-router-dom';
class NotFound extends Component {
  componentDidMount() {
    document.title='Không tìm thấy trang yêu cầu'
  }
  render() {
    return (
      <div className="error-container">
        <div className="error-img">
          <img src={ErrorImg} />
        </div>
        <Link className='link-to-home' to='/'>
        <Button display="Trang chủ" style="btn-back-home" />
        </Link>
      </div>
    );
  }
}

export default NotFound;
