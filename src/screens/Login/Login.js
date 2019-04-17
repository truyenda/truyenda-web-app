import React, { Component } from "react";
import "./Login.scss";
import TextInput from "../../components/commonUI/TextInput";
import CheckBox from "../../components/commonUI/CheckBox";
import Button from "../../components/commonUI/Button";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import * as SessionAction from "../../actions/SessionActions.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Progress from "../../components/commonUI/Progress";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogned: false,
      username: "",
      usernameMes: "",
      password: "",
      passwordMes: "",
      remember: false,
      inProgress: false
    };
  }
  componentWillMount() {
    var cookies = new Cookies();
    var isLogined = false;
    if (cookies.get("ToKen")) {
      isLogined = true;
      SessionAction.validateSession();
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
      const loginCallback = () => {
        this.setState({ inProgress: false });
      };
      const { login } = this.props.actions;
      const user = {
        username: this.state.username,
        password: this.state.password,
        remember: this.state.remember
      };
      login(user, this.props.history, loginCallback);
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
                disabled={this.state.inProgress}
                onClick={() => {
                  if (!this.props.inProgress) {
                    this.setState({ inProgress: true });
                    this.LoginEvent();
                  }
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

            {this.state.inProgress ? (
              <Progress display="Đang đăng nhập..." />
            ) : (
              ""
            )}
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

const mapDispatch = dispatch => {
  return {
    actions: bindActionCreators(SessionAction, dispatch)
  };
};

export default connect(
  null,
  mapDispatch
)(Login);
