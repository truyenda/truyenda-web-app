import React, { Component } from "react";
import "../CategoryTable/CategoryTable.scss";
import ReactTable from "react-table";
import Progress from "../../../components/commonUI/Progress";
import { Link } from "react-router-dom";
import AccountListApi from "../../../api/AccountListApi.js";
import Toast from "../../../components/commonUI/Toast";
import Alert from "../../../components/commonUI/Alert";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import Modal from "react-responsive-modal";
import Select from "react-select";
import ManagerPressions from "../../../api/ManagerPressions";
import TeamApi from "../../../api/TeamApi";
import "./Account.scss";
import UserAccessFilter from "../../../actions/UserAccessFilter";
import StringUtils from "../../../utils/StringUtils";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: 1,
      loading: false,
      openModal: false,
      isEditing: false,
      TenQuyen: [],
      teams: [],
      status: [
        {
          value: 1,
          label: "Bình Thường"
        },
        {
          value: 2,
          label: "Khóa Tài Khoản"
        }
      ],
      profile: {
        Username: "",
        Email: "",
        IdQuyen: "",
        TenQuyen: "",
        IdNhom: "",
        TenNhom: "",
        IdTrangThai: "",
        TenTrangThai: ""
      },
      alert: {
        Username: "",
        Email: "",
        IdQuyen: "",
        TenQuyen: "",
        IdNhom: "",
        TenNhom: "",
        IdTrangThai: "",
        TenTrangThai: ""
      }
    };
  }
  componentDidMount() {
    if (UserAccessFilter("ACCOUNT_LIS")) {
      AccountListApi.list().then(res => {
        if (res.data.Code === 200) {
          this.setState({
            data: res.data.Data.listTaiKhoan,
            pages: res.data.Data.Paging.TotalPages
          });
        } else {
          this.setState({
            error: true
          });
          Toast.notify(res.data.MsgError, "Mã lỗi: " + res.data.Code);
        }
      });
      this.getPressions();
      this.getTeams();
    } else {
      this.setState({ error: true });
    }
  }
  componentDidUpdate(){
    if (document.getElementsByClassName("rt-th")[9])
      document
        .getElementsByClassName("rt-th")[9]
        .getElementsByTagName("input")[0]
        .setAttribute("placeholder", "Tìm tài khoản");
  }
  toggleLoading(status) {
    this.setState({
      loading: status
    });
  }

  clearDataState() {
    this.setState({
      profile: {
        Username: "",
        Email: "",
        IdQuyen: "",
        TenQuyen: "",
        IdNhom: "",
        TenNhom: "",
        IdTrangThai: "",
        TenTrangThai: ""
      },
      alert: {},
      isEditing: false
    });
  }

  setFormData(key, value) {
    var profile = this.state.profile;
    profile[key] = value;
    this.setState({
      profile: profile
    });
    this.setState({
      alert: {}
    });
  }

  setStateForm(key, value) {
    this.setState({
      [key]: value
    });
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

  onEditAccount(profile) {
    const getTenQuyenById = Id => {
      let data = [];
      this.state.TenQuyen.forEach(tenquyen => {
        if (tenquyen.value.toString() === Id.toString()) {
          data = tenquyen;
        }
      });
      return data;
    };

    const getTeamById = Id => {
      let data = [];
      this.state.teams.forEach(team => {
        if (team.value.toString() === Id.toString()) {
          data = team;
        }
      });
      return data;
    };
    const getStatusById = Id => {
      let data = [];
      this.state.status.forEach(status => {
        if (status.value.toString() === Id.toString()) {
          data = status;
        }
      });
      return data;
    };
    this.setState({
      isEditing: true,
      profile: {
        Id: profile.Id,
        Username: profile.Username,
        Email: profile.Email,
        IdQuyen: profile.IdQuyen,
        TenQuyen: getTenQuyenById(profile.IdQuyen),
        IdNhom: profile.IdNhom,
        TenNhom: getTeamById(profile.IdNhom),
        IdTrangThai: profile.IdTrangThai,
        TenTrangThai: getStatusById(profile.IdTrangThai)
      }
    });
    this.onShowModal();
  }

  onUpdateAccount(profile) {
    this.setState({
      loading: true
    });
    this.onCloseModal();
    AccountListApi.update(profile)
      .then(res => {
        if (res.data.Code === 200) {
          Toast.success(profile.Username, res.data.MsgError);
          this.state.data.forEach(c => {
            if (c.Id === profile.Id) {
              c.Username = profile.Username;
              c.Email = profile.Email;
              c.TenNhom = profile.TenNhom.label;
              c.IdNhom = profile.IdNhom;
              c.IdQuyen = profile.IdQuyen;
              c.IdTrangThai = profile.IdTrangThai;
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

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.profile.Email || this.state.profile.Email.length === 0) {
      alert.Email = "Bạn cần nhập email";
    } else {
      if (!StringUtils.validateEmail(this.state.profile.Email)) {
        alert.Email = "Email không đúng định dạng";
      }
    }
    if (
      !this.state.profile.Username ||
      this.state.profile.Username.length === 0
    ) {
      alert.Username = "Bạn cần nhập username";
    } else {
      if (!StringUtils.validUsername(this.state.profile.Username)) {
        alert.Username =
          "Tên đăng nhập từ 8 đến 24 ký tự, không có ký tự đặc biệt hoặc khoảng trắng";
      }
    }
    if (alert.Email || alert.Username) {
      isValid = false;
      this.setState({
        alert: alert
      });
    }
    return isValid;
  }

  onSubmitForm() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let profile = this.state.profile;
      this.onCloseModal();
      this.onUpdateAccount(profile);
    }
  }

  onBanAccount(profile) {
    Alert.warn(
      profile.IdTrangThai === 1
        ? "Bạn có muốn khóa tài khoản này không?"
        : "Bạn có muốn mở khóa tài khoản này không?",
      profile.Username,
      () => {
        this.setState({
          loading: true
        });
        if (profile.IdTrangThai === 1) {
          profile.IdTrangThai = 2;
        } else {
          profile.IdTrangThai = 1;
        }
        AccountListApi.update(profile)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              this.state.data.forEach(c => {
                if (c.Id === profile.Id) {
                  c.Username = profile.Username;
                  c.Email = profile.Email;
                  c.TenNhom = profile.TenNhom;
                  c.IdNhom = profile.IdNhom;
                  c.IdQuyen = profile.IdQuyen;
                  c.IdTrangThai = profile.IdTrangThai;
                }
              });
              Toast.success(profile.Username, "Cập nhật tài khoản thành công");
            }
          })
          .catch(err => {
            Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      },
      () => {}
    );
  }

  onRemoveAccount(account) {
    Alert.warn(
      "Bạn có muốn tài khoản này không?",
      account.Username,
      () => {
        this.setState({
          loading: true
        });
        AccountListApi.delete(account)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(account.Username, "Đã xóa account");
              var newData = [];
              this.state.data.forEach(s => {
                if (s.Id !== account.Id) {
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

  getPressions() {
    let data = [];
    ManagerPressions.list()
      .then(res => {
        res.data.Data.forEach(TenQuyen => {
          data.push({ label: TenQuyen.TenVaiTro, value: TenQuyen.Id });
        });
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          TenQuyen: data
        });
      });
  }

  getTeams() {
    let data = [];
    TeamApi.list()
      .then(res => {
        res.data.Data.listNhomDich.forEach(team => {
          data.push({ label: team.TenNhomDich, value: team.Id });
        });
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          teams: data
        });
      });
  }

  loadPage(state, instance) {
    this.setState({
      loading: true
    });
    if (state.filtered[0] && state.filtered[0].value.trim().length !== 0) {
      AccountListApi.search(state.filtered[0].value, state.page + 1)
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.setState({
              data: res.data.Data.listTaiKhoan,
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
      AccountListApi.list(state.page + 1)
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.setState({
              data: res.data.Data.listTaiKhoan,
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
    if (this.state.error) {
      return <Link to="/dashboard/accounts">Thử lại</Link>;
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
        Header: "Username",
        accessor: "Username",
        width: 150,
        maxWidth: 150,
        filterable: false
      },
      {
        Header: "Email",
        accessor: "Email"
      },
      {
        Header: "Tên Nhóm",
        accessor: "TenNhom",
        filterable: false,
        maxWidth: 200
      },
      {
        Header: "Vai trò",
        accessor: "TenQuyen",
        filterable: false,
        maxWidth: 150
      },
      {
        Header: "",
        accessor: "IdTrangThai",
        filterable: false,
        Cell: cell => (
          <span className="user-status">
            {cell.value === 1 ? (
              <i className="fas fa-user-check fa-xs"> </i>
            ) : (
              <i className="fas fa-user-times fa-xs" />
            )}
          </span>
        ),
        maxWidth: 50
      },
      {
        Header: "",
        accessor: "IdTrangThai",
        sortable: false,
        filterable: false,
        Cell: cell => {
          return (
            <div className="action-group">
              {UserAccessFilter("ACCOUNT_UPD") &&
                cell.original.Id !==
                  JSON.parse(
                    localStorage.getItem("redux-react-session/USER_DATA")
                  ).Id_TaiKhoan && (
                  <i
                    className="far fa-edit"
                    onClick={() => {
                      this.onEditAccount(cell.original);
                    }}
                  />
                )}
              {UserAccessFilter("ACCOUNT_UPD") &&
              cell.original.Id !==
                JSON.parse(
                  localStorage.getItem("redux-react-session/USER_DATA")
                ).Id_TaiKhoan ? (
                cell.value === 1 ? (
                  <i
                    className="fas fa-user-slash"
                    onClick={() => {
                      this.onBanAccount(cell.original);
                    }}
                  />
                ) : (
                  <i
                    className="fas fa-recycle"
                    onClick={() => {
                      this.onBanAccount(cell.original);
                    }}
                  />
                )
              ) : (
                ""
              )}
              {UserAccessFilter("ACCOUNT_DEL") &&
                cell.original.Id !==
                  JSON.parse(
                    localStorage.getItem("redux-react-session/USER_DATA")
                  ).Id_TaiKhoan && (
                  <i
                    className="fas fa-times fa-lg"
                    onClick={() => {
                      this.onRemoveAccount(cell.original);
                    }}
                  />
                )}
            </div>
          );
        },
        maxWidth: 100
      }
    ];

    if (!UserAccessFilter("ACCOUNT_LIS")) {
      return <div>Bạn không đủ quyền để lấy dữ liệu</div>;
    }

    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>Danh sách tài khoản</span>
        </div>
        <Modal
          classNames={{ modal: "modal-add" }}
          open={this.state.openModal}
          onClose={() => {
            this.onCloseModal();
          }}
          center
        >
          <h2>
            {this.state.isEditing ? "Chỉnh sửa account" : "Tạo account mới"}
          </h2>
          <TextInput
            id="Username"
            onChanged={(key, value) => {
              this.setFormData(key, value);
            }}
            alert={this.state.alert.Username}
            display="Username"
            value={this.state.isEditing ? this.state.profile.Username : null}
          />
          <TextInput
            id="Email"
            onChanged={(key, value) => {
              this.setFormData(key, value);
            }}
            alert={this.state.alert.Email}
            display="Email"
            value={this.state.isEditing ? this.state.profile.Email : null}
          />

          <Select
            placeholder="Chọn nhóm..."
            options={this.state.teams}
            value={this.state.profile.TenNhom}
            onChange={v => {
              this.setFormData("TenNhom", v);
              this.setFormData("IdNhom", v.value);
            }}
          />
          {/* 
          <Select
            placeholder="Trạng thái..."
            options={this.state.status}
            value={this.state.profile.TenTrangThai}
            onChange={v => {
              this.setFormData("TenTrangThai", v);
              this.setFormData("IdTrangThai", v.value);
            }}
          /> */}

          <Select
            placeholder="Chọn quyền..."
            options={this.state.TenQuyen}
            value={this.state.profile.TenQuyen}
            onChange={v => {
              this.setFormData("TenQuyen", v);
              this.setFormData("IdQuyen", v.value);
            }}
          />

          <div className="action-group">
            <Button
              display={this.state.isEditing ? "Cập nhật" : "Tạo"}
              type="btn-Green"
              onClick={() => {
                // if (this.state.isEditing)
                this.onSubmitForm();
                // : this.onAddAccount();
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

export default Account;
