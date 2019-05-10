import React, { Component } from "react";
import "./Forgot.scss";
import TextInput from "../../components/commonUI/TextInput";
import Button from "../../components/commonUI/Button";
import AccessDenied from "../Error/AccessDenied";
import AccountApi from "../../api/AccountApi";
import Toast from "../../components/commonUI/Toast";
import { withRouter } from "react-router-dom";
class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      form: { newPass: "", cfPass: "" },
      alert: {},
      token: null
    };
  }
  componentDidMount() {
    document.title = "Yêu cầu đổi mật khẩu mới";
    if (!localStorage.getItem("redux-react-session/USER_DATA")) {
      let url = document.location.href;
      let token = url.split("=")[1];
      if (token && token.length > 50) {
        this.setState({ token });
      } else {
        this.setState({ isError: true });
      }
    } else {
      this.setState({ isError: true });
    }
  }

  setFormState(key, value) {
    let form = this.state.form;
    form[key] = value;
    this.setState({ form, alert: {} });
  }

  validateInput() {
    let result = true;
    let alert = {};
    if (!this.state.form.newPass || this.state.form.newPass.length === 0) {
      alert.newPass = "Bạn cần nhập mật khẩu";
    } else {
      if (
        this.state.form.newPass.length < 6 ||
        this.state.form.newPass.length > 32
      ) {
        alert.newPass = "Mật khẩu ít nhất 6 ký tự và tối đa 32 ký tự";
      }
    }
    if (!this.state.form.cfPass || this.state.form.cfPass.length === 0) {
      alert.cfPass = "Bạn cần nhập xác nhận mật khẩu ở trên";
    } else {
      if (this.state.form.newPass !== this.state.form.cfPass) {
        alert.cfPass = "Mật khẩu đã nhập không khớp";
      }
    }
    if (alert.newPass || alert.cfPass) {
      result = false;
    }
    this.setState({ alert });
    if (result) {
      this.setState({ isDisableButton: true });
    }
    return result;
  }
  onSubmitForm() {
    if (this.validateInput()) {
      AccountApi.requestChangePassword(
        this.state.token,
        this.state.form.newPass
      )
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.props.history.push("/login");
            Toast.success(
              "Bạn có thể đăng nhập bằng mật khẩu mới",
              "Đổi mật khẩu thành công"
            );
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Cõ lỗi trong quá trình kết nối");
        })
        .finally(() => {
          this.setState({ isDisableButton: false });
        });
    }
  }
  render() {
    if (this.state.isError) {
      return <AccessDenied />;
    }
    return (
      <div className="forgot-container">
        <div className="forgot-wrapper">
          <div className="form-wrapper">
            <h2>Yêu cầu đổi mật khẩu mới</h2>
            <TextInput
              id="newPass"
              onChanged={(k, v) => this.setFormState(k, v)}
              display="Mật khẩu mới"
              type="password"
              style="text-input"
              alert={this.state.alert.newPass}
            />
            <TextInput
              id="cfPass"
              onChanged={(k, v) => this.setFormState(k, v)}
              display="Xác nhận mật khẩu"
              type="password"
              style="text-input"
              alert={this.state.alert.cfPass}
            />
            <div className="btn-wrapper">
              <Button
                display="Xác nhận"
                style="button-confirm"
                onClick={() => this.onSubmitForm()}
                disabled={this.state.isDisableButton}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Forgot);
