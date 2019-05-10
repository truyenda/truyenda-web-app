import React, { Component } from "react";
import Button from "../../../components/commonUI/Button";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
import FilePicker from "../../../components/commonUI/FilePicker";
import Select from "react-select";
import "./MyTeam.scss";
import Alert from "../../../components/commonUI/Alert";
import Toast from "../../../components/commonUI/Toast";
import TeamMemApi from "../../../api/TeamMemApi";
import TeamApi from "../../../api/TeamApi";
import { connect } from "react-redux";
import Progress from "../../../components/commonUI/Progress";
import PhotoApi from "../../../api/PhotoApi";
import StringUtils from "../../../utils/StringUtils";
import RoleApi from "../../../api/RoleApi";
import UserAccessFilter from "../../../actions/UserAccessFilter";
import { withRouter } from "react-router-dom";
class MyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      team: {
        Id: null,
        name: "Nhóm dịch",
        description: ""
      },
      form: {
        memberId: null,
        memberName: null,
        role: {},
        teamName: null,
        teamDescription: null,
        teamLogo: null
      },
      member: { role: {} },
      alert: {},
      showAddMem: false,
      showPerMen: false,
      showInfo: false,
      role: []
    };
  }

  componentDidMount() {
    let IdTeam = null;
    if (this.props.IdTeam) {
      IdTeam = this.props.IdTeam;
    } else {
      IdTeam = this.props.user.Id_NhomDich;
    }
    this.setState({ loading: true });
    TeamApi.get(IdTeam)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState(
            {
              team: {
                Id: res.data.Data.Id,
                name: res.data.Data.TenNhomDich,
                description: res.data.Data.MoTa,
                logo: res.data.Data.Logo
              }
            },
            () => this.getTeamMemberList()
          );
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });

    this.getTeamRole();
  }

  getTeamMemberList() {
    TeamMemApi.list(this.state.team.Id)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({ data: res.data.Data.ThanhVienList });
        }
      })
      .catch(err => {
        this.setState({ isError: true });
      });
  }

  componentDidUpdate() {
    if (document.getElementsByClassName("rt-th")[4]) {
      if (
        document
          .getElementsByClassName("rt-th")[4]
          .getElementsByTagName("input")
      )
        if (
          document
            .getElementsByClassName("rt-th")[4]
            .getElementsByTagName("input")[0]
        )
          document
            .getElementsByClassName("rt-th")[4]
            .getElementsByTagName("input")[0]
            .setAttribute("placeholder", "Tìm thành viên");
    }
  }

  onShowAddMember() {
    let form = {
      memberId: null,
      memberName: null,
      role: {},
      teamName: null,
      teamDescription: null,
      teamLogo: null
    };
    this.setState({ showAddMem: true, form });
  }
  onCloseAddMember() {
    this.setState({ showAddMem: false });
  }
  onShowPerMember(member) {
    let form = {
      memberId: member.Id_TaiKhoanThanhVien,
      memberName: member.Username,
      role: this.getRole(member.Id_Role)
    };
    this.setState({ showPerMen: true, form });
  }
  onClosePerMember() {
    this.setState({ showPerMen: false });
  }
  onShowModalInfo() {
    let form = {
      memberId: null,
      memberName: null,
      role: {},
      teamName: this.state.team.name,
      teamDescription: this.state.team.description,
      teamLogo: this.state.team.logo
    };
    this.setState({ showInfo: true, form });
  }
  onCloseModalInfo() {
    this.setState({ showInfo: false });
  }
  getTeamRole() {
    RoleApi.getTeamRole()
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          let role = [];
          res.data.Data.forEach(r => {
            role.push({ label: r.TenVaiTro, value: r.Id });
          });
          this.setState({ role });
        }
      })
      .catch(err => console.log(err));
  }

  setFormData(key, value) {
    let form = this.state.form;
    form[key] = value;
    this.setState({ alert: {}, form });
  }

  onAddMember() {
    const checkForm = () => {
      if (
        !this.state.form.memberName ||
        this.state.form.memberName.length === 0
      ) {
        let alert = {};
        alert.memberName = "Bạn cần nhập tên thành viên";
        this.setState({ alert });
        return false;
      }
      return true;
    };
    if (checkForm()) {
      this.setState({ loading: true });
      this.onCloseAddMember();
      TeamMemApi.add(this.state.team.Id, this.state.form.memberName)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(
              this.state.form.memberName,
              "Thêm thành viên thành công",
              {
                onClose: () => {
                  location.reload();
                }
              }
            );
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.form.teamName || this.state.form.teamName.length === 0) {
      alert.teamName = "Bạn cần nhập tên nhóm";
    }
    if (
      !this.state.form.teamDescription ||
      this.state.form.teamDescription.length === 0
    ) {
      alert.teamDescription = "Bạn cần nhập mô tả cho nhóm";
    } else {
      if (this.state.form.teamDescription.length > 512) {
        alert.teamDescription = "Mô tả tối đa 512 ký tự";
      }
    }
    if (!this.state.form.teamLogo || this.state.form.teamLogo.length === 0) {
      alert.teamLogo = "Logo của nhóm không được để trống";
    } else {
      if (!StringUtils.validateLinkPhoto(this.state.form.teamLogo)) {
        alert.teamLogo = "Bạn phải nhập link ảnh";
      }
    }
    if (alert.teamName || alert.teamDescription || alert.teamLogo) {
      isValid = false;
      this.setState({
        alert: alert
      });
    }
    return isValid;
  }

  onUpdateTeamInfo() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let form = this.state.form;
      this.onCloseModalInfo();
      TeamApi.update({
        Id: this.state.team.Id,
        name: form.teamName,
        description: form.teamDescription,
        Logo: form.teamLogo
      })
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(form.teamName, "Cập nhật thông tin thành công");
            let team = this.state.team;
            team.name = form.teamName;
            team.description = form.teamDescription;
            team.logo = form.teamLogo;
            this.setState({ team });
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  onRemoveMember(member) {
    Alert.warn(
      "Bạn có muốn xóa thành viên này khỏi nhóm?",
      member.Username,
      () => {
        this.setState({ loading: true });
        TeamMemApi.delete(this.state.team.Id, member.Id_TaiKhoanThanhVien)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(member.Username, "Đã xóa thành viên khỏi nhóm");
              let data = [];
              this.state.data.forEach(d => {
                if (d.Id_TaiKhoanThanhVien !== member.Id_TaiKhoanThanhVien) {
                  data.push(d);
                }
              });
              this.setState({ data });
            } else {
              Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
            }
          })
          .catch(err => Toast.error("Có lỗi trong quá trình kết nối"))
          .finally(() => this.setState({ loading: false }));
      },
      () => {}
    );
  }
  getRoleNameById(IdRole) {
    if (IdRole === 5) {
      return <span className="status-label">Reader</span>;
    }
    if (this.getRole(IdRole))
      return (
        <span className="status-label complete">
          {this.getRole(IdRole).label}
        </span>
      );
    return <span className="status-label delay">Hệ thống</span>;
  }
  getRole(IdRole) {
    for (var i = 0; i < this.state.role.length; i++) {
      if (this.state.role[i].value === IdRole) {
        return this.state.role[i];
      }
    }
    return null;
  }
  onUpdateRole() {
    this.onClosePerMember();
    if (this.state.form.role) {
      this.setState({ loading: true });
      TeamMemApi.update(
        this.state.team.Id,
        this.state.form.memberId,
        this.state.form.role.value
      )
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            Toast.success(
              this.state.form.memberName + "=>" + this.state.form.role.label,
              "Cập nhật vai trò thành công"
            );
            let data = this.state.data;
            data.map(v => {
              if (v.Id_TaiKhoanThanhVien === this.state.form.memberId) {
                v.Id_Role = this.state.form.role.value;
              }
            });
            this.setState({ data });
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => Toast.error("Có lỗi trong quá trình kết nối"))
        .finally(() => this.setState({ loading: false }));
    }
  }
  onDeleteTeam() {
    Alert.warn(
      "Bạn có chắc chắn muốn xóa nhóm không?",
      "Hãy cẩn trọng với hành động này! Hành động này sẽ xóa tất cả các truyện của nhóm và loại bỏ tất cả thành viên",
      () => {
        TeamApi.delete({ Id: this.state.team.Id })
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(
                "Bạn sẽ được chuyển hưởng về trang chủ",
                "Xóa nhóm thành công",
                {
                  onClose: () => {
                    this.props.history.push("/");
                  }
                }
              );
            } else {
              Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
            }
          })
          .catch(err => Toast.error("Có lỗi trong quá trình kết nối"));
      },
      () => {}
    );
  }
  isSystemRole(IdUser) {
    if (this.state.data)
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].Id_TaiKhoanThanhVien === IdUser) {
          if (this.state.data[i].Id_Role === 5) return false;
          for (var j = 0; j < this.state.role.length; j++) {
            if (this.state.data[i].Id_Role === this.state.role[j].value)
              return false;
          }
        }
      }
    return true;
  }
  render() {
    if (this.state.isError) {
      return <div>Có lỗi xảy ra</div>;
    }
    const columns = [
      {
        Header: "ID",
        accessor: "Id_TaiKhoanThanhVien",
        maxWidth: 50,
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        filterable: false
      },
      { Header: "Tên thành viên", accessor: "Username", filterable: false },
      {
        Header: "Vai trò",
        accessor: "Id_Role",
        maxWidth: 150,
        Cell: cell => this.getRoleNameById(cell.value),
        filterable: false
      },
      {
        Header: "",
        maxWidth: 100,
        Cell: cell => (
          <div className="action-group">
            {UserAccessFilter("TEAMMEM_PER") &&
              cell.original.Id_TaiKhoanThanhVien !==
                JSON.parse(
                  localStorage.getItem("redux-react-session/USER_DATA")
                ).Id_TaiKhoan && (
                <i
                  className="fas fa-user-tag"
                  onClick={() => {
                    this.onShowPerMember(cell.original);
                  }}
                />
              )}
            {UserAccessFilter("TEAMMEM_DEL") &&
              cell.original.Id_TaiKhoanThanhVien !==
                JSON.parse(
                  localStorage.getItem("redux-react-session/USER_DATA")
                ).Id_TaiKhoan && (
                <i
                  className="fas fa-times fa-lg"
                  onClick={() => {
                    this.onRemoveMember(cell.original);
                  }}
                />
              )}
          </div>
        ),
        filterable: false
      }
    ];
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>{this.state.team.name}</span>
          <Modal
            onClose={() => this.onCloseAddMember()}
            open={this.state.showAddMem}
            classNames={{ modal: "modal-add-mem" }}
          >
            <h2>Thêm thành viên vào nhóm</h2>
            <TextInput
              display="Tên thành viên"
              id="memberName"
              value={this.state.form.memberName}
              onChanged={(k, v) => this.setFormData(k, v)}
              alert={this.state.alert.memberName}
            />
            <div className="action-group">
              <Button
                type="btn-Green"
                display="Thêm"
                onClick={() => this.onAddMember()}
              />
              <Button
                type="btn-Gray"
                display="Hủy"
                onClick={() => this.onCloseAddMember()}
              />
            </div>
          </Modal>
          <Modal
            classNames={{ modal: "modal-add" }}
            open={this.state.showInfo}
            onClose={() => {
              this.onCloseModalInfo();
            }}
            center
          >
            <h2>Chỉnh sửa thông tin nhóm</h2>
            <TextInput
              id="teamName"
              display="Tên nhóm dịch"
              value={this.state.form.teamName}
              onChanged={(k, v) => this.setFormData(k, v)}
              alert={this.state.alert.teamName}
            />
            <TextArea
              id="teamDescription"
              display="Mô tả"
              value={this.state.form.teamDescription}
              onChanged={(k, v) => this.setFormData(k, v)}
              alert={this.state.alert.teamDescription}
            />
            <div className="logo-team-form">
              <div className="logo-display-container">
                <img
                  src={
                    this.state.form.teamLogo
                      ? this.state.form.teamLogo
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
                    console.log(files);
                    files.forEach(file => {
                      this.setState({
                        uploading: true
                      });
                      PhotoApi(file)
                        .then(res => {
                          console.log(res.data.link);
                          this.setFormData("teamLogo", res.data.link);
                        })
                        .catch(err => Toast.error(err))
                        .finally(() => this.setState({ uploading: false }));
                    });
                  }}
                />
                <div className="group-input ">
                  <label className="pure-material-textfield-filled">
                    <input
                      id="Logo"
                      name="Logo"
                      placeholder=" "
                      value={this.state.form.teamLogo}
                      onChange={e => {
                        this.setFormData("teamLogo", e.target.value);
                      }}
                    />
                    <span>Logo</span>
                  </label>
                  <div
                    className={
                      "field-alert " + (this.state.alert.teamLogo ? "" : "hide")
                    }
                  >
                    <p>{this.state.alert.teamLogo}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-group">
              <Button
                display="Cập nhật"
                type="btn-Green"
                onClick={() => this.onUpdateTeamInfo()}
              />
              <Button
                display="Hủy"
                type="btn-Gray"
                onClick={() => {
                  this.onCloseModalInfo();
                }}
              />
            </div>
          </Modal>
          <Modal
            onClose={() => this.onClosePerMember()}
            open={this.state.showPerMen}
            classNames={{ modal: "modal-per-mem" }}
          >
            <h2>
              Thành viên <i>{this.state.form.memberName}</i>
            </h2>
            {this.isSystemRole(this.state.form.memberId) ? (
              <center>
                <i>Không thể thay đổi vai trò của người này</i>
              </center>
            ) : (
              <Select
                options={this.state.role}
                value={this.state.form.role}
                onChange={v => this.setFormData("role", v)}
              />
            )}
            <div className="action-group">
              {!this.isSystemRole(this.state.form.memberId) && (
                <Button
                  type="btn-ok"
                  display="Cập nhật"
                  onClick={() => {
                    this.onUpdateRole();
                  }}
                />
              )}
              <Button
                type="btn-Gray"
                display="Hủy"
                onClick={() => this.onClosePerMember()}
              />
            </div>
          </Modal>
        </div>
        {!this.state.loading ? (
          <div className="btn-add-wrapper">
            {UserAccessFilter("TEAM_DEL") && (
              <Button
                display=" Xóa nhóm"
                type="btn-del"
                icon="fas fa-ban"
                style="btn-team-info"
                onClick={() => {
                  this.onDeleteTeam();
                }}
              />
            )}
            {UserAccessFilter("TEAM_UPD") && (
              <Button
                display=" Thông tin nhóm"
                icon="fas fa-info"
                style="btn-team-info"
                onClick={() => {
                  this.onShowModalInfo();
                }}
              />
            )}
            {UserAccessFilter("TEAMMEM_ADD") && (
              <Button
                display=" Thêm thành viên"
                type="btn-Green"
                icon="fas fa-user-plus"
                style="btn-add-cate"
                onClick={() => {
                  this.onShowAddMember();
                }}
              />
            )}
          </div>
        ) : (
          <Progress />
        )}
        {this.state.data ? (
          <ReactTable
            columns={columns}
            data={this.state.data}
            loading={this.state.loading}
            LoadingComponent={LoadingCmp}
            showPageSizeOptions={false}
            filterable={true}
            resizable={false}
            defaultPageSize={20}
            previousText="Trang trước"
            nextText="Trang tiếp"
            loadingText="Đang tải..."
            noDataText="Không có dữ liệu"
            pageText="Trang"
            ofText="trên"
            rowsText="hàng"
            defaultFilterMethod={(filter, row, column) => {
              const id = filter.pivotId || filter.id;
              return row[id] !== undefined
                ? String(row[id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                : true;
            }}
            defaultSorted={[
              {
                id: "Id",
                desc: !true
              }
            ]}
            className="-striped -highlight"
            getTdProps={() => ({
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }
            })}
          />
        ) : (
          <Progress />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.session.user,
  auth: state.session.authenticated
});

export default withRouter(
  connect(
    mapState,
    null
  )(MyTeam)
);

const LoadingCmp = props => {
  return props.loading ? (
    <div className="loadingcmp">
      <Progress />
    </div>
  ) : (
    ""
  );
};
