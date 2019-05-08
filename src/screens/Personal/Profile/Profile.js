import React, { Component } from "react";
import "./Profile.scss";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
import SelectBox from "../../../components/commonUI/SelectBox";
import { useDropzone } from "react-dropzone";
import Toast from "../../../components/commonUI/Toast";
import Button from "../../../components/commonUI/Button";
import FilePicker from "../../../components/commonUI/FilePicker/FilePicker";
import PhotoApi from "../../../api/PhotoApi";
import { sessionService } from "redux-react-session";
import DefPhoto from "../../../assets/photo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SessionAction from "../../../actions/SessionActions.js";
import { withRouter, Redirect } from "react-router-dom";
import StringUtils from "../../../utils/StringUtils.js";
import AccountApi from "../../../api/AccountApi.js";
import Progress from "../../../components/commonUI/Progress";
import Photo from "../../../components/commonUI/Photo";
import TeamApi from "../../../api/TeamApi";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentShow: 1,
      user: {},
      name: "",
      gender: 0,
      birthday: "",
      cfPassword: "",
      newPassword: "",
      reNewPassword: "",
      teamName: "",
      teamDescription: "",
      teamLogo: "",
      debug: true, //TODO: disable debug mode
      isDisableButton: false
    };
  }
  setComponentShow(com) {
    this.setState({
      componentShow: com
    });
  }
  setStateForm(key, value) {
    this.setState({
      [key]: value,
      alert: {}
    });
  }
  componentWillMount() {
    document.title = "Thông tin tài khoản";
    sessionService
      .loadUser()
      .then(res => this.setState({ user: res }))
      .catch(err => console.log(err));
    var mesField = {
      name: "",
      gender: 0,
      birthday: "",
      cfPassword: "",
      newPassword: "",
      reNewPassword: "",
      teamName: "",
      teamDescription: "",
      teamLogo: ""
    };
    this.setState({ alert: mesField });
  }
  LogoutEvent() {
    const { logout } = this.props.actions;
    logout(this.props.history);
  }
  ValidInput() {
    var isValid = true;
    var alert = {};
    if (this.state.componentShow === 1) {
      if (!this.state.name || this.state.name.length === 0) {
        alert.name = "Tên hiển thị không được để trống";
        isValid = false;
      } else {
        if (this.state.name.length > 32) {
          alert.name = "Tên hiển thị tối đa 32 ký tự";
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
    }
    if (this.state.componentShow === 2) {
      if (!this.state.cfPassword || this.state.cfPassword.length === 0) {
        alert.cfPassword = "Bạn cần nhập mật khẩu để thực hiện";
        isValid = false;
      }
      if (!this.state.newPassword || this.state.newPassword.length === 0) {
        alert.newPassword = "Mật khẩu không được để trống";
        isValid = false;
      } else {
        if (
          this.state.newPassword.length < 6 ||
          this.state.newPassword.length > 32
        ) {
          alert.newPassword = "Mật khẩu phải ít nhất từ 6 đến 32 ký tự";
          isValid = false;
        }
      }
      if (!this.state.reNewPassword || this.state.reNewPassword.length === 0) {
        alert.reNewPassword = "Bạn cần nhập xác nhận lại mật khẩu";
        isValid = false;
      } else {
        if (this.state.newPassword !== this.state.reNewPassword) {
          alert.rePassword = "Mật khẩu mới không khớp";
          isValid = false;
        }
      }
    }
    this.setState({ alert: alert });
    return isValid;
  }
  UpdateAccount() {
    if (this.ValidInput()) {
      this.setState({ isDisableButton: true });
      AccountApi.update(
        this.state.name,
        this.state.birthday,
        this.state.gender.toString() === "0" ? false : true
      )
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            Toast.success("Đã cập nhập thông tin tài khoản", "Thành công");
            sessionService.refreshFromLocalStorage();
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => Toast.error("Có lỗi trong quá trình kết nối"))
        .finally(() => {
          this.setState({ isDisableButton: false });
        });
    }
  }
  ChangePassword() {
    if (this.ValidInput()) {
      this.setState({ isDisableButton: true });
      AccountApi.update(
        this.state.name,
        this.state.birthday,
        this.state.gender.toString() === "0" ? false : true,
        this.state.cfPassword,
        this.state.reNewPassword
      )
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            Toast.success("Đã mật khẩu tài khoản", "Thành công");
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => Toast.error("Có lỗi trong quá trình kết nối"))
        .finally(() => {
          this.setState({ isDisableButton: false });
        });
    }
  }

  ValidInputTeamForm() {
    var alert = {};
    var isValid = true;
    if (!this.state.teamName || this.state.teamName.length === 0) {
      alert.teamName = "Bạn cần nhập tên nhóm";
    } else {
      if (this.state.teamName.length > 32) {
        alert.teamName = "Tên nhóm không được vượt quá 32 ký tự";
      }
    }
    if (
      !this.state.teamDescription ||
      this.state.teamDescription.length === 0
    ) {
      alert.teamDescription = "Bạn cần nhập mô tả cho nhóm";
    } else {
      if (this.state.teamDescription > 500) {
        alert.teamDescription = "Mô tả tối đa 500 ký tự";
      }
    }
    if (!this.state.teamLogo || this.state.teamLogo.length === 0) {
      alert.teamLogo = "Bạn cần nhập đường dẫn ảnh đại diện cho nhóm";
    } else {
      if (!StringUtils.validateLinkPhoto(this.state.teamLogo)) {
        alert.teamLogo = "Bạn cần nhập đường dẫn ảnh";
      }
    }
    if (alert.teamName || alert.teamDescription || alert.teamLogo) {
      isValid = false;
      this.setState({ alert: alert });
    }
    return isValid;
  }
  CreateTeam() {
    if (this.ValidInputTeamForm()) {
      this.setState({ isDisableButton: true });
      TeamApi.create({
        name: this.state.teamName,
        description: this.state.teamDescription,
        Logo: this.state.teamLogo
      })
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            Toast.success(
              this.state.teamName,
              "Nhóm của bạn đã tạo thành công"
            );
            location.reload();
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Có lỗi trong quá trình kết nối");
        })
        .finally(() => {
          this.setState({ isDisableButton: false });
        });
    }
  }
  render() {
    if (!this.state.user.Email) {
      return <Progress />;
    }
    return (
      <div>
        <div className="profile-route-container">
          <div>
            <span
              onClick={e => {
                this.setComponentShow(1);
              }}
              className={this.state.componentShow == 1 ? "active" : ""}
            >
              <i className="far fa-address-card" /> Thông tin cá nhân
            </span>
            <span
              onClick={e => {
                this.setComponentShow(2);
              }}
              className={this.state.componentShow == 2 ? "active" : ""}
            >
              <i className="fas fa-key" /> Mật khẩu
            </span>
            {this.state.user.Id_NhomDich === 1 ? (
              <span
                onClick={e => {
                  this.setComponentShow(3);
                }}
                className={this.state.componentShow == 3 ? "active" : ""}
              >
                <i className="fas fa-user-friends" /> Nhóm của bạn
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        {this.state.componentShow == 1 ? (
          <div>
            <ProfileAvatar />
            <div className="profile-container">
              <div className="content-space">
                <h1>Thông tin cá nhân</h1>
                <div className="profile-form">
                  <TextInput
                    display="Email"
                    value={this.state.user.Email}
                    disabled={true}
                  />
                  <TextInput
                    display="Tài khoản"
                    value={this.state.user.Username}
                    disabled={true}
                  />
                  <TextInput
                    id="name"
                    display="Tên hiển thị"
                    onChanged={(key, value) => {
                      this.setStateForm(key, value);
                    }}
                    value={this.state.user.Ten}
                    alert={this.state.alert.name}
                  />
                  <SelectBox
                    selected={this.state.user.GioiTinh === false ? "0" : "1"}
                    id="gender"
                    display="Giới tính"
                    data={[[1, "Nam"], [0, "Nữ"]]}
                    onChanged={(key, value) => {
                      this.setStateForm(key, value);
                    }}
                  />
                  <TextInput
                    id="birthday"
                    display="Ngày sinh"
                    type="date"
                    onChanged={(key, value) => {
                      this.setStateForm(key, value);
                    }}
                    value={this.state.user.NgaySinh.split("T")[0]}
                    alert={this.state.alert.birthday}
                  />
                  <div className="btn-info-container">
                    <Button
                      display="Lưu"
                      onClick={() => {
                        this.UpdateAccount();
                      }}
                      disabled={this.state.isDisableButton}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.componentShow == 2 ? (
          <div className="profile-container password-con">
            <div className="content-space">
              <h1>Mật khẩu tài khoản</h1>
              <TextInput
                id="cfPassword"
                alert={this.state.alert.cfPassword}
                display="Mật khẩu cũ"
                onChanged={(key, value) => {
                  this.setStateForm(key, value);
                }}
                type="password"
              />
              <TextInput
                id="newPassword"
                alert={this.state.alert.newPassword}
                display="Mật khẩu mới"
                onChanged={(key, value) => {
                  this.setStateForm(key, value);
                }}
                type="password"
              />
              <TextInput
                id="reNewPassword"
                alert={this.state.alert.reNewPassword}
                display="Xác nhận mật khẩu mới"
                onChanged={(key, value) => {
                  this.setStateForm(key, value);
                }}
                type="password"
              />
              <div className="btn-info-container">
                <Button
                  display="Đổi mật khẩu"
                  onClick={() => {
                    this.ChangePassword();
                  }}
                  disabled={this.state.isDisableButton}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.componentShow == 3 ? (
          <div className="profile-container password-con">
            <div className="content-space">
              <h1>Tạo nhóm dịch của bạn</h1>
              <TextInput
                id="teamName"
                display="Tên nhóm dịch"
                value={this.state.teamName}
                onChanged={(key, value) => {
                  this.setStateForm(key, value);
                }}
                alert={this.state.alert.teamName}
              />
              <TextArea
                id="teamDescription"
                display="Mô tả"
                style="description-team"
                onChanged={(key, value) => {
                  this.setStateForm(key, value);
                }}
                alert={this.state.alert.teamDescription}
              />
              <div className="logo-team-form">
                <div className="logo-display-container">
                  <Photo
                    src={
                      this.state.teamLogo
                        ? this.state.teamLogo
                        : "/70fa8d92aab8c65c6b9acca88204487c.png"
                    }
                    className="normal-avatar"
                  />
                  {this.state.uploading && (
                    <div className="loadingcmp">
                      <Progress />
                    </div>
                  )}
                </div>
                <div className="logo-input">
                  <FilePicker
                    multiple={false}
                    mSize={2}
                    onAccept={files => {
                      files.forEach(file => {
                        this.setState({
                          uploading: true
                        });
                        PhotoApi(file)
                          .then(res => {
                            this.setState({
                              uploading: false,
                              teamLogo: res.data.link,
                              alert: {}
                            });
                          })
                          .catch(err => Toast.error(err));
                      });
                    }}
                  />
                  <div className="group-input ">
                    <label className="pure-material-textfield-filled">
                      <input
                        id="Logo"
                        name="Logo"
                        placeholder=" "
                        onChange={event =>
                          this.setStateForm("teamLogo", event.target.value)
                        }
                        value={this.state.teamLogo}
                      />
                      <span>Logo</span>
                    </label>
                    <div
                      className={
                        "field-alert " +
                        (this.state.alert.teamLogo ? "" : "hide")
                      }
                    >
                      <p>{this.state.alert.teamLogo}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="btn-info-container">
                <Button
                  display="Tạo"
                  onClick={() => {
                    this.CreateTeam();
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="btn-logout-container">
          <Button
            display="Đăng xuất"
            type="btn-cancel"
            style="btn-logout"
            onClick={() => {
              this.LogoutEvent();
            }}
            disabled={this.state.isDisableButton}
          />
        </div>
      </div>
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

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Profile)
);

const ProfileAvatar = props => {
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
    <section className="profile-avatar-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="photo-wrapper">
          <img className="user-avatar" src={props.src ? props.src : DefPhoto} />
          <div className="overlay-avatar">
            <span className="icon">
              <i className="fa fa-user" />
            </span>
          </div>
        </div>
      </div>
      <aside />
    </section>
  );
};
