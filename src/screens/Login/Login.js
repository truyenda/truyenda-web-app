import React, { Component } from "react";
import "./Login.scss";
import TextInput from "../../components/commonUI/TextInput";
import CheckBox from "../../components/commonUI/CheckBox";
import Button from "../../components/commonUI/Button";
import { Link, Redirect } from "react-router-dom";
import Caller from "../../utils/APICaller.js";
import Cookies from "universal-cookie";
import Toast from '../../components/commonUI/Toast';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogned: false,
      username: "",
      usernameMes: "",
      password: "",
      passwordMes: "",
      remember: false
    };
  }

  componentWillMount() {
    var cookies = new Cookies();
    var isLogined = false;
    if (cookies.get("token")) {
      isLogined = true;
    } else {
      isLogined = false;
    }
    this.setState({
      isLogined: isLogined
    });
  }

  componentDidMount() {
    document.title = "Đăng nhập trang web";
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
      Caller("login", "POST", {
        username: this.state.username,
        password: this.state.password,
        remember: this.state.remember
      })
        .then(res => {
          this.solveResponse(res.data);
        })
        .catch(err => {
          console.log(err);
          Toast.error('Có lỗi trong quá trình kết nối');
          this.setState({ log: "error" });
        });
    }
  }
  solveResponse(res) {
    if (res.Code && res.Code === 200) {
      Toast.success('Đăng nhập thành công', 'Thành công', {
        onOpen: ({ cls }) => {
          this.setState({
            log: "Đang nhập thành công, code return " + res.Code,
            isLogined: true
          });
        }
      });
      this.setCookie(res.Data.Token)
    } else {
      if (res.Code < 300)
        Toast.error('Tài khoản đăng nhập không đúng', 'Error ' + res.Code);
      else
        Toast.error(res.MsgEror);
    }
  }
  setCookie(token) {
    const cookies = new Cookies();
    var date = new Date();
    let days = 4;
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookies.set("token", token, {
      path: "/",
      domain: ".truyenda.tk",
      expires: date
    });
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
    var { isLogined } = this.state;
    if (isLogined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-container">
        <div className="title-log">Đăng nhập</div>
        <div className="login-content">
          <form
            className="login-form"
            onSubmit={event => this.handleSubmitForm(event)}
          >
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
          <div className="break-line-block">
            <span>HOẶC</span>
          </div>
          <div className="social-panel">
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
                style="rep-btn mat1em"
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
