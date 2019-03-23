import React, { Component } from "react";
import "./Login.scss";
import TextInput from "../../components/commonUI/TextInput";
import CheckBox from "../../components/commonUI/CheckBox";
import Button from "../../components/commonUI/Button";
import { Link } from "react-router-dom";
import Caller from "../../utils/APICaller.js";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameMes: "",
      password: "",
      passwordMes: "",
      remember: false
    };
  }
  handleSubmitForm(event) {
    event.preventDefault();
  }
  ValidInput() {
    var isValid = true;
    if (this.state.username.length == 0) {
      this.state.usernameMes = "Không thể để trống trường này";
      isValid = false;
    }
    if (this.state.password.length == 0) {
      this.state.passwordMes = "Không thể để trống trường này";
      isValid = false;
    }
    return isValid;
  }
  LoginEvent() {
    this.setState({ log: "Đang đăng nhập..." });
    if (this.ValidInput()) {
      Caller("api/home/login", "POST", {
        username: this.state.username,
        password: this.state.password,
        remember: this.state.remember
      })
        .then(res => {
          this.setState({
            log: "Đang nhập thành công, code return " + res.data.Code
          });
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.setState({ log: "error" });
        });
    }
  }
  setStateForm(key, value) {
    this.setState({
      [key]: value
    });
    if (this.state[key + "Mes"] !== "" && value !== "") {
      this.setState({
        [key + "Mes"]: ""
      });
    }
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
            <div className="break-line-block">
              <span>Đăng nhập bằng tài khoản</span>
            </div>
            <TextInput
              display="Tên đăng nhập"
              id="username"
              value="admin"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.usernameMes}
            />
            <TextInput
              display="Mật khẩu"
              id="password"
              value="admin"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.passwordMes}
            />
            <div>
              <Link to="forgot" className="forgot-password">
                Quên mật khẩu?
              </Link>
            </div>
            <CheckBox
              display="Ghi nhớ đăng nhập"
              id="remember"
              onChanged={(key, value) => this.setStateForm(key, value)}
            />
            <div className="login-btn-container">
              <Button
                display="Đăng nhập"
                submit="submit"
                style="rep-btn"
                onClick={() => {
                  this.LoginEvent();
                }}
              />
              <Link to="/signup">
                <Button
                  display="Tạo tài khoản mới"
                  type="btn-Green"
                  style="rep-btn"
                />
              </Link>
            </div>
          </form>
          <div className="social-panel">
            <div className="break-line-block">
              <span>Đăng nhập bằng tài khoản liên kết</span>
            </div>
            <div className="social-btn-container">
              <Button
                display=" Đăng nhập với Facebook"
                icon="fab fa-facebook"
                type="btn-Blue"
                style="rep-btn"
                onClick={() => {}}
              />
              <Button
                display=" Đăng nhập với Google"
                icon="fab fa-google"
                type="btn-del"
                style="rep-btn"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
