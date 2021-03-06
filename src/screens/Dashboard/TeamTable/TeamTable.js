import React, { Component } from "react";
import ReactTable from "react-table";
import TeamApi from "../../../api/TeamApi.js";
import Toast from "../../../components/commonUI/Toast";
import Progress from "../../../components/commonUI/Progress";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import FilePicker from "../../../components/commonUI/FilePicker";
import { Link } from "react-router-dom";
import "./TeamTable.scss";
import StringUtils from "../../../utils/StringUtils";
import PhotoApi from "../../../api/PhotoApi";
import { toTeamLink } from "../../../utils/LinkUtils";
import Photo from "../../../components/commonUI/Photo";
import MyTeam from "../MyTeam";
import UserAccessFilter from "../../../actions/UserAccessFilter";
class TeamTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: 1,
      loading: false,
      uploading: false,
      openModal: false,
      openTeam: false,
      isEditing: false,
      team: {
        Id: "",
        name: "",
        description: "",
        Logo: ""
      },
      alert: {
        Id: "",
        name: "",
        description: "",
        Logo: ""
      },
      teamSelected: null
    };
  }

  componentDidMount() {
    TeamApi.list()
      .then(res => {
        if (res.data.Code === 200) {
          this.setState(
            {
              data: res.data.Data.listNhomDich,
              pages: res.data.Data.Paging.TotalPages
            },
            () => {
              document
                .getElementsByClassName("rt-th")[7]
                .getElementsByTagName("input")[0]
                .setAttribute("placeholder", "Tìm nhóm");
            }
          );
        } else {
          Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          this.setState({
            isError: true
          });
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
        this.setState({
          isError: true
        });
      });
  }

  clearDataState() {
    this.setState({
      team: { Id: "", name: "", description: "", Logo: "" },
      alert: {},
      isEditing: false,
      uploading: false
    });
  }

  setFormData(key, value) {
    var team = this.state.team;
    team[key] = value;
    this.setState({
      team: team
    });
    this.setState({
      alert: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.team.name || this.state.team.name.length === 0) {
      alert.name = "Bạn cần nhập tên nhóm";
    }
    if (
      !this.state.team.description ||
      this.state.team.description.length === 0
    ) {
      alert.description = "Bạn cần nhập mô tả cho nhóm";
    } else {
      if (this.state.team.description.length > 512) {
        alert.description = "Mô tả tối đa 512 ký tự";
      }
    }
    if (!this.state.team.Logo || this.state.team.Logo.length === 0) {
      alert.Logo = "Logo của nhóm không được để trống";
    } else {
      if (!StringUtils.validateLinkPhoto(this.state.team.Logo)) {
        alert.Logo = "Bạn phải nhập link ảnh";
      }
    }
    if (alert.name || alert.description || alert.Logo) {
      isValid = false;
      this.setState({
        alert: alert
      });
    }
    return isValid;
  }

  onAddTeam() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let team = this.state.team;
      this.onCloseModal();
      TeamApi.create(team)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(team.name, "Đã tạo thành công");
            let data = this.state.data;
            data.push({
              Id: res.data.ThongTinBoSung1,
              TenNhomDich: team.name,
              MoTa: team.description,
              Logo: team.Logo
            });
            this.setState(
              {
                data: data
              },
              () => console.log(this.state.data)
            );
          } else {
            Toast.notify(res.data.MsgError);
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
  onShowModal() {
    this.setState({
      openModal: true
    });
  }
  onCloseModal() {
    this.setState({
      openModal: false
    });
    this.clearDataState();
  }
  onShowTeamModal(team = null) {
    this.setState({ openTeam: true, teamSelected: team });
  }
  onCloseTeamModal() {
    this.setState({ openTeam: false, teamSelected: null });
  }

  onEditTeam(team) {
    this.setState({
      isEditing: true,
      team: {
        Id: team.Id,
        name: team.TenNhomDich,
        description: team.MoTa,
        Logo: team.Logo
      }
    });
    this.onShowModal();
  }

  onUpdateTeam() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let team = this.state.team;
      this.onCloseModal();
      TeamApi.update(team)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(team.name, "Cập nhật thông tin thành công");
            this.state.data.forEach(t => {
              if (t.Id === team.Id) {
                t.TenNhomDich = team.name;
                t.MoTa = team.description;
                t.Logo = team.Logo;
              }
            });
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

  onRemoveTeam(team) {
    Alert.warn(
      "Bạn có muốn xóa nhóm này không?",
      team.TenNhomDich,
      () => {
        this.setState({
          loading: true
        });
        TeamApi.delete(team)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(team.TenNhomDich, "Đã xóa nhóm dịch");
              var newData = [];
              this.state.data.forEach(s => {
                if (s.Id !== team.Id) {
                  newData.push(s);
                }
              });
              this.setState({
                data: newData
              });
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
      },
      () => {}
    );
  }

  loadPage(state, instance) {
    this.setState({
      loading: true
    });
    if (state.filtered[0] && state.filtered[0].value.trim().length !== 0) {
      TeamApi.search(state.filtered[0].value, state.page + 1)
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.setState({
              data: res.data.Data.listNhomDich,
              pages: res.data.Data.Paging.TotalPages
            });
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
    } else {
      TeamApi.list(state.page + 1)
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.setState({
              data: res.data.Data.listNhomDich,
              pages: res.data.Data.Paging.TotalPages
            });
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
  render() {
    if (this.state.isError) {
      return <Link to="/dashboard/teams">Thử lại</Link>;
    }
    const columns = [
      {
        Header: "ID",
        accessor: "Id",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        width: 50,
        maxWidth: 50,
        filterable: false
      },
      {
        Header: "Logo",
        accessor: "Logo",
        Cell: cell => (
          <Link to={toTeamLink(cell.original.TenNhomDich, cell.original.Id)}>
            <Photo
              className="team-logo"
              src={
                cell.value
                  ? cell.value
                  : "/70fa8d92aab8c65c6b9acca88204487c.png"
              }
            />
          </Link>
        ),
        maxWidth: 90,
        filterable: false
      },
      {
        Header: "Tên nhóm",
        accessor: "TenNhomDich",
        Cell: cell => (
          <Link to={toTeamLink(cell.value, cell.original.Id)}>
            {cell.value}
          </Link>
        ),
        maxWidth: 200
      },
      {
        Header: "Mô tả",
        accessor: "MoTa",
        filterable: false
      },
      {
        Header: "",
        sortable: false,
        filterable: false,
        Cell: cell => {
          return (
            <div className="action-group">
              {UserAccessFilter("TEAM_UPD") && (
                <i
                  className="far fa-edit"
                  onClick={() => {
                    this.onEditTeam(cell.original);
                  }}
                />
              )}
              {UserAccessFilter("TEAM_MAN") && (
                <i
                  className="fas fa-user-cog"
                  onClick={() => {
                    this.onShowTeamModal(cell.original);
                  }}
                />
              )}
              {UserAccessFilter("TEAM_DEL") && (
                <i
                  className="fas fa-times fa-lg"
                  onClick={() => {
                    this.onRemoveTeam(cell.original);
                  }}
                />
              )}
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>Nhóm dịch truyện</span>
        </div>

        <div className="btn-add-wrapper">
          {UserAccessFilter("TEAM_ALL") && (
            <Button
              display=" Tạo mới"
              type="btn-Green"
              icon="fa fa-plus-square"
              style="btn-add-cate"
              onClick={() => {
                this.onShowModal();
              }}
            />
          )}
          <Modal
            classNames={{ modal: "modal-team" }}
            open={this.state.openTeam}
            onClose={() => this.onCloseTeamModal()}
          >
            <MyTeam
              IdTeam={
                this.state.teamSelected ? this.state.teamSelected.Id : null
              }
            />
          </Modal>
          <Modal
            classNames={{ modal: "modal-add" }}
            open={this.state.openModal}
            onClose={() => {
              this.onCloseModal();
            }}
            center
          >
            <h2>
              {this.state.isEditing
                ? "Chỉnh sửa thông tin nhóm"
                : "Tạo nhóm dịch mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên nhóm dịch"
              value={this.state.isEditing ? this.state.team.name : null}
            />
            <TextArea
              id="description"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.description}
              display="Mô tả"
              value={this.state.isEditing ? this.state.team.description : null}
            />
            <div className="logo-team-form">
              <div className="logo-display-container">
                <img
                  src={
                    this.state.team.Logo
                      ? this.state.team.Logo
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
                          let team = this.state.team;
                          team.Logo = res.data.link;
                          this.setState({
                            uploading: false,
                            uploadedLink: res.data.link,
                            team: team,
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
                        this.setFormData("Logo", event.target.value)
                      }
                      value={this.state.team.Logo}
                    />
                    <span>Logo</span>
                  </label>
                  <div
                    className={
                      "field-alert " + (this.state.alert.Logo ? "" : "hide")
                    }
                  >
                    <p>{this.state.alert.Logo}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.state.isEditing ? this.onUpdateTeam() : this.onAddTeam();
                }}
              />
              <Button
                display="Hủy"
                type="btn-Gray"
                onClick={() => {
                  this.onCloseModal();
                }}
              />
            </div>
          </Modal>
        </div>
        {!this.state.data ? (
          <Progress display="Đang tải dữ liệu..." />
        ) : (
          <ReactTable
            data={this.state.data}
            pages={this.state.pages}
            columns={columns}
            loading={this.state.loading}
            LoadingComponent={LoadingCmp}
            showPageSizeOptions={false}
            filterable={true}
            resizable={false}
            defaultPageSize={20}
            manual
            onFetchData={(state, instance) => {
              this.loadPage(state, instance);
            }}
            sortable={false}
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
        )}
      </div>
    );
  }
}
const LoadingCmp = props => {
  return props.loading ? (
    <div className="loadingcmp">
      <Progress />
    </div>
  ) : (
    ""
  );
};

export default TeamTable;
