import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./SignUp.scss";
import TextInput from "../../components/commonUI/TextInput";
import Button from "../../components/commonUI/Button";
import SelectBox from "../../components/commonUI/SelectBox";
class SignUp extends Component {
  render() {
    return (
      <div className="signup-container">
        <div className="signup-title">Đăng kí tài khoản</div>
        <div className="signup-content">
          <form className="form-signup">
            <TextInput display="Tên hiển thị" />
            <TextInput display="Tên đăng nhập" />
            <TextInput display="Email" type="email" />
            <TextInput display="Mật khẩu" type="password" />
            <TextInput display="Nhập lại mật khẩu" type="password" />
            <div className="date-gen">
              <TextInput
                display="Ngày sinh"
                type="date"
                style="date-picker"
              />
              <SelectBox
                id="gender"
                display="Giới tính"
                data={[[1, "Nam"], [0, "Nữ"]]}
                onChanged={(r, e) => {}}
                style="gender-select"
              />
            </div>
            <div className="create-btn-container">
              <Button display="Tạo tài khoản" type="btn-Green" />
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

export default SignUp;
