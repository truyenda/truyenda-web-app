import React, { Component } from "react";
import "./Menu.scss";
import Button from "../../../components/commonUI/Button";
import logo from "../../../assets/85e9f040-5369-4fdb-8463-90e3d8dabf86.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SessionAction from "../../../actions/SessionActions.js";
import { withRouter } from 'react-router-dom'
import DefPhoto from '../../../assets/photo.png';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnHome: false
    };
  }
  LogoutEvent() {
    const { logout } = this.props.actions;
    logout(this.props.history);
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
          {this.props.authenticated?<Link className='nav-mycomic' to="/personal/comics">Truyện của tôi</Link>:''}
          {this.props.authenticated ? (
            <div className="user-profile-icon">
              <Link to="/personal/profile">
                <img
                  alt={this.props.user.Ten}
                  className="user-avatar"
                  src={DefPhoto}
                />
              </Link>
              <div className="dropdown">
                <Link to="/personal/profile">
                  <i className="fas fa-user-circle" /> Tài khoản
                </Link>
                <Link to="/personal/comics">
                  <i className="fas fa-book-reader" /> Truyện của tôi
                </Link>
                <a
                  onClick={() => {
                    this.LogoutEvent();
                  }}
                >
                  <i className="fas fa-sign-out-alt" /> Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <span>
                <Button style="p-login-btn" display="Login" />
              </span>
            </Link>
          )}
          {this.props.user.Email ? (
            <Link to="/dashboard">
              <Button display="Quản lý" type="btn-ok" />
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

export default withRouter(connect(
  mapState,
  mapDispatch
)(Menu));
