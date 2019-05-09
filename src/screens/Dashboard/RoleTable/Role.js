import React, { Component } from "react";
import ReactTable from "react-table";
import Toast from "../../../components/commonUI/Toast";
import Progress from "../../../components/commonUI/Progress";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import { Link } from "react-router-dom";
import RoleApi from "../../../api/RoleApi";
import PermissionApi from "../../../api/PermissionApi";
import Select from "react-select";
import UserAccessFilter from "../../../actions/UserAccessFilter";
class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      openModal: false,
      isEditing: false,
      permissions: [],
      role: {
        name: "",
        permissions: null
      },
      alert: {
        name: "",
        permissions: []
      }
    };
  }

  componentDidMount() {
    if (UserAccessFilter("ACCOUNT_PER")) {
      RoleApi.list()
        .then(res => {
          if (res.data.Code === 200) {
            this.setState({
              data: res.data.Data
            });
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
      PermissionApi.list()
        .then(res => {
          if (res.data.Code === 200) {
            let permissions = [];
            res.data.Data.forEach(el => {
              permissions.push({ label: el.TenQuyen, value: el.Id });
            });
            this.setState({
              permissions: permissions
            });
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
    } else {
      this.setState({ isError: true });
    }
  }

  clearDataState() {
    this.setState({
      role: { name: null, permissions: null },
      alert: {},
      isEditing: false
    });
  }

  setFormData(key, value) {
    var role = this.state.role;
    role[key] = value;
    this.setState({
      role: role
    });
    this.setState({
      alert: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.role.name || this.state.role.name.length === 0) {
      alert.name = "Bạn cần nhập tên vai trò";
    } else {
      if (this.state.role.name.length > 24) {
        alert.name = "Tên vai trò tối đa 24 ký tự";
      }
    }
    if (alert.name) {
      isValid = false;
    }
    this.setState({
      alert: alert
    });
    return isValid;
  }

  onAddRole() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let role = this.state.role;
      this.onCloseModal();
      RoleApi.create(role)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(role.name, "Đã tạo thành công");
            let data = this.state.data;
            data.push({
              Id: res.data.ThongTinBoSung1,
              TenVaiTro: role.name
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

  onEditRole(role) {
    this.setState(
      {
        isEditing: true,
        role: {
          Id: role.Id,
          name: role.TenVaiTro
        }
      },
      () => this.getRolePermissions()
    );
    this.onShowModal();
  }

  onUpdateRole() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let role = this.state.role;
      this.onCloseModal();
      RoleApi.update(role)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(role.name, "Cập nhật vai trò thành công");
            this.state.data.forEach(c => {
              if (c.Id === role.Id) {
                c.TenVaiTro = role.name;
              }
            });
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          console.log(err);
          Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  onRemoveRole(role) {
    Alert.warn(
      "Bạn có muốn xóa vai trò này không?",
      role.TenVaiTro,
      () => {
        this.setState({
          loading: true
        });
        RoleApi.delete(role)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(role.TenVaiTro, "Đã xóa vai trò");
              var newData = [];
              this.state.data.forEach(c => {
                if (c.Id !== role.Id) {
                  newData.push(c);
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

  getRolePermissions() {
    this.setState({ loading: true });
    RoleApi.get(this.state.role.Id)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          let permissions = [];
          res.data.Data.Permissions.forEach(per => {
            permissions.push({ label: per.TenQuyen, value: per.Id_Quyen });
          });
          let role = this.state.role;
          role.permissions = permissions;
          this.setState({ role });
        }
      })
      .catch(err => {
        this.setState({ isError: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "Id",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        width: 50,
        maxWidth: 50,
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm ID"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
          />
        )
      },
      {
        Header: "Tên tên vai trò",
        accessor: "TenVaiTro",
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm vai trò"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
          />
        )
      },
      {
        Header: "",
        sortable: false,
        filterable: false,
        Cell: cell => {
          return (
            <div className="action-group">
              <i
                className="far fa-edit"
                onClick={() => {
                  this.onEditRole(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  this.onRemoveRole(cell.original);
                }}
              />
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    if (this.state.isError) {
      return <Link to="/dashboard/categories">Thử lại</Link>;
    }
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>Vai trò hệ thống</span>
        </div>

        <div className="btn-add-wrapper">
          {this.state.data && (
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
            classNames={{ modal: "modal-add" }}
            open={this.state.openModal}
            onClose={() => {
              this.onCloseModal();
            }}
            center
          >
            <h2>
              {this.state.isEditing ? "Chỉnh vai trò" : "Tạo vai trò mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên vai trò"
              value={this.state.role.name}
            />
            {this.state.loading && <Progress />}
            {(!this.state.isEditing || this.state.role.permissions) && (
              <Select
                placeholder="Chọn quyền..."
                isMulti
                options={this.state.permissions}
                value={this.state.role.permissions}
                onChange={v => {
                  this.setFormData("permissions", v);
                }}
              />
            )}
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.state.isEditing ? this.onUpdateRole() : this.onAddRole();
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
            columns={columns}
            loading={this.state.loading}
            LoadingComponent={LoadingCmp}
            filterable={true}
            resizable={false}
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

export default Role;
