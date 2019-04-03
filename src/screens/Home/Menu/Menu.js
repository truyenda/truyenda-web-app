import React, { Component } from "react";
import "./Menu.scss";
import Button from "../../../components/commonUI/Button";
import logo from "../../../assets/85e9f040-5369-4fdb-8463-90e3d8dabf86.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sessionService } from "redux-react-session";
import Cookies from "universal-cookie";
import * as SessionAction from "../../../actions/SessionActions.js";
import Toast from "../../../components/commonUI/Toast";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnHome: false
    };
  }
  LogoutEvent() {
    sessionService.deleteSession();
    sessionService.deleteUser();
    var cookie = new Cookies();
    cookie.remove("token", {
      path: "/",
      domain: ".truyenda.tk"
    });
    Toast.success('Bạn đã đăng xuất')
  }
  render() {
    return (
      <header className="header">
        <Link className="logo" to="/">
          <img alt="logo" src={logo} />
        </Link>
        <ul className="main-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/all-manga">Danh sách</Link>
          <Link to="/latest-update">Mới nhất</Link>
          {this.props.user.Id ? (
            <div className="user-profile-icon">
              <Link to="/personal/profile">
                <img
                  alt={this.props.user.Ten}
                  className="user-avatar"
                  src="https://avatars0.githubusercontent.com/u/31062901?s=88&v=4"
                />
              </Link>
              <div className="dropdown">
                <Link to="/personal/profile">
                  <i className="fas fa-user-circle" /> Tài khoản
                </Link>
                <Link to="/personal/comics">
                  <i className="fas fa-book-reader" /> Truyện của tôi
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    this.LogoutEvent();
                  }}
                >
                  <i className="fas fa-sign-out-alt" /> Đăng xuất
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <span>
                <Button style="p-login-btn" display="Login" />
              </span>
            </Link>
          )}
          {this.props.user.Id ? (
            <Link to="/dashboard">
              <Button display="Quản lí" type="btn-Green" />
            </Link>
          ) : (
            ""
          )}
        </ul>
      </header>
    );
  }
}

const mapState = state => ({
  user: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(SessionAction, dispatch)
  };
};

export default connect(
  mapState,
  mapDispatch
)(Menu);
