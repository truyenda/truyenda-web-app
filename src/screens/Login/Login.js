import React, { Component } from "react";
import "./Login.scss";
import TextInput from "../../components/commonUI/TextInput";
import CheckBox from "../../components/commonUI/CheckBox";
import Button from "../../components/commonUI/Button";
import { Link, Redirect } from "react-router-dom";
class Login extends Component {
  handleSubmitForm(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="login-container">
        <div className="title-log">Đăng nhập</div>
        <div className="login-content">
          <form
            className="login-form"
            onSubmit={event => this.handleSubmitForm(event)}
          >
            <TextInput display="Tên đăng nhập" id="username" />
            <TextInput display="Mật khẩu" id="password" />
            <div>
              <Link to="forgot" className="forgot-password">
                Quên mật khẩu?
              </Link>
            </div>
            <CheckBox display="Ghi nhớ đăng nhập" id="remember-pass" />
            <div className="login-btn-container">
              <Button
                id="btn-login"
                display="Đăng nhập"
                submit="submit"
                style="p-login-btn"
                onClick={() => {
                  console.log("dang nhap");
                }}
              />
              <Link to="/signup">
                <Button
                  display="Tạo tài khoản mới"
                  type="btn-del"
                  style="p-sign-btn"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
