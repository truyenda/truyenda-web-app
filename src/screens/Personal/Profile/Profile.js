import React, { Component } from "react";
import "./Profile.scss";
import "../../../components/commonUI/TextInput";
import TextInput from "../../../components/commonUI/TextInput";
import SelectBox from "../../../components/commonUI/SelectBox";
import { useDropzone } from "react-dropzone";
import Toast from "../../../components/commonUI/Toast";
import Button from "../../../components/commonUI/Button";

function Profile(props) {
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDropAccepted: files => {
      Toast.success(files[0].name);
    },
    onDropRejected: files => {
      Toast.notify("Ảnh có kích thước tối đa 2MB");
    }
  });
  return (
    <div>
      <section className="avatar-container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="photo-wrapper">
            <img
              className="user-avatar"
              src="https://avatars0.githubusercontent.com/u/31062901?s=88&v=4"
            />
            <div className="overlay-avatar">
              <span className="icon">
                <i className="fa fa-user" />
              </span>
            </div>
          </div>
        </div>
        <aside />
      </section>
      <div className="profile-container">
        <div className="content-space">
          <h1>Thông tin cá nhân</h1>
          <div className="profile-form">
            <TextInput display="Email" value="admin@mail.com" disabled={true} />
            <TextInput display="Tài khoản" value="admin" disabled={true} />
            <TextInput display="Tên hiển thị" />
            <SelectBox
              id="gender"
              display="Giới tính"
              data={[[1, "Nam"], [0, "Nữ"]]}
              onChanged={(key, value) => {}}
            />
            <TextInput display="Ngày sinh" type="date" />
            <div className="btn-info-container">
              <Button display="Lưu" />
            </div>
          </div>
        </div>
      </div>
      <div className="profile-container password-con">
        <div className="content-space">
          <h1>Mật khẩu tài khoản</h1>
          <TextInput display="Mật khẩu cũ" type="password" />
          <TextInput display="Mật khẩu mới" type="password" />
          <TextInput display="Xác nhận mật khẩu mới" type="password" />
          <div className="btn-info-container">
            <Button display="Đổi mật khẩu" />
          </div>
        </div>
      </div>
      <div className="btn-logout-container">
        <Button display="Đăng xuất" type="btn-cancel" style="btn-logout" />
      </div>
    </div>
  );
}

export default Profile;
