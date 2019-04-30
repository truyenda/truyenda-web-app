import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import TextInput from "../../components/commonUI/TextInput";
import Button from "../../components/commonUI/Button";
import SelectBox from "../../components/commonUI/SelectBox";
import StringUtils from "../../utils/StringUtils.js";
import AccountApi from "../../api/AccountApi";
import Toast from "../../components/commonUI/Toast";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableBtn: false,
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      birthday: "",
      gender: 0
    };
  }
  componentWillMount() {
    var mesField = this.state;
    this.setState({
      alert: mesField
    });
  }
  componentDidMount() {
    document.title = "Tạo tài khoản mới";
    var cookies = new Cookies();
    if (cookies.get("ToKen", { domain: ".truyenda.tk", path: "/" })) {
      this.props.history.push("/");
    }
  }
  handleSubmitForm(event) {
    event.preventDefault();
  }
  ValidInput() {
    var isValid = true;
    alert = {};
    if (!this.state.name || this.state.name === 0) {
      alert.name = "Tên hiển thị không được để trống";
      isValid = false;
    } else {
      if (this.state.name.length > 32) {
        alert.name = "Tên hiển thị tối đa 32 ký tự";
        isValid = false;
      }
    }
    if (!this.state.username || this.state.username.length === 0) {
      alert.username = "Tên đăng nhập không được để trống";
      isValid = false;
    } else {
      if (!StringUtils.validUsername(this.state.username)) {
        alert.username =
          "Tên đăng nhập từ 8 đến 24 ký tự, không có ký tự đặc biệt hoặc khoảng trắng";
        isValid = false;
      }
    }
    if (!this.state.email || this.state.email.length === 0) {
      alert.email = "Email không được để trống";
      isValid = false;
    } else {
      if (!StringUtils.validateEmail(this.state.email)) {
        alert.email = "Email không đúng định dạng";
        isValid = false;
      }
    }
    if (!this.state.password || this.state.password.length === 0) {
      alert.password = "Mật khẩu không được để trống";
      isValid = false;
    } else {
      if (this.state.password.length < 6 || this.state.password.length > 32) {
        alert.password = "Mật khẩu phải ít nhất từ 6 đến 32 ký tự";
        isValid = false;
      }
    }
    if (!this.state.rePassword || this.state.rePassword.length === 0) {
      alert.rePassword = "Bạn cần nhập xác nhận lại mật khẩu";
      isValid = false;
    } else {
      if (this.state.password !== this.state.rePassword) {
        alert.rePassword = "Mật khẩu không khớp";
        isValid = false;
      }
    }
    if (!this.state.birthday || this.state.birthday.length === 0) {
      alert.birthday = "Ngày sinh không được để trống";
      isValid = false;
    } else {
      if (!StringUtils.validateDate(this.state.birthday)) {
        alert.birthday = "Ngày sinh không đúng định dạng";
        isValid = false;
      } else {
        var age = StringUtils.getAge(this.state.birthday);
        if (age <= 10 || age >= 100) {
          alert.birthday = "Tuổi không được chấp nhận";
          isValid = false;
        }
      }
    }
    this.setState({
      alert: alert
    });
    return isValid;
  }
  SignUpEvent() {
    if (this.ValidInput()) {
      this.setState({ disableBtn: true });
      AccountApi.create(
        this.state.username,
        this.state.name,
        this.state.name === 0 ? false : true,
        this.state.birthday,
        this.state.email,
        this.state.password,
        this.state.rePassword
      )
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            Toast.success("Bạn đã tạo tài khoản thành công", "Thành công");
            this.props.history.push("/login");
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Có lỗi xảy ra trong quá trình kết nối!");
        })
        .finally(() => {
          this.setState({ disableBtn: false });
        });
    }
  }
  setStateForm(key, value) {
    this.setState({
      [key]: value,
      alert: {}
    });
  }
  render() {
    return (
      <div className="signup-container">
        <div className="signup-title">Đăng kí tài khoản</div>
        <div className="signup-content">
          <form
            className="form-signup"
            onSubmit={event => this.handleSubmitForm(event)}
          >
            <TextInput
              id="name"
              display="Tên hiển thị"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.alert.name}
            />
            <TextInput
              id="username"
              display="Tên đăng nhập"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.alert.username}
            />
            <TextInput
              id="email"
              display="Email"
              type="email"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.alert.email}
            />
            <TextInput
              id="password"
              display="Mật khẩu"
              type="password"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.alert.password}
            />
            <TextInput
              id="rePassword"
              display="Nhập lại mật khẩu"
              type="password"
              onChanged={(key, value) => this.setStateForm(key, value)}
              alert={this.state.alert.rePassword}
            />
            <div className="date-gen">
              <TextInput
                id="birthday"
                display="Ngày sinh"
                type="date"
                style="date-picker"
                onChanged={(key, value) => this.setStateForm(key, value)}
                value={StringUtils.getCurrentDate()}
                alert={this.state.alert.birthday}
              />
              <SelectBox
                id="gender"
                display="Giới tính"
                data={[[1, "Nam"], [0, "Nữ"]]}
                style="gender-select"
                onChanged={(key, value) => this.setStateForm(key, value)}
                alert={this.state.alert.gender}
              />
            </div>
            <div className="create-btn-container">
              <Button
                display="Tạo tài khoản"
                type="btn-Green"
                onClick={() => {
                  this.SignUpEvent();
                }}
                disabled={this.state.disableBtn}
              />
              <Link to="/">
                <Button display="Trang chủ" type="btn-ok" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(SignUp);
