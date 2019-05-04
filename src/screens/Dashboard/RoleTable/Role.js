import React, { Component } from "react";
import ReactTable from "react-table";
import CategoryApi from "../../../api/CategoryApi.js";
import Toast from "../../../components/commonUI/Toast";
import Progress from "../../../components/commonUI/Progress";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import RoleApi from "../../../api/RoleApi";
import PermissionApi from "../../../api/PermissionApi";
import Select from "react-select";
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
        permissions: []
      },
      alert: {
        name: "",
        permissions: []
      }
    };
  }

  componentDidMount() {
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
  }

  clearDataState() {
    this.setState({
      role: { name: "", permissions: [] },
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

//   checkValidation() {
//     var isValid = true;
//     var alert = {};
//     if (!this.state.role.name || this.state.role.name.length === 0) {
//       alert.name = "Bạn cần nhập tên thể loại";
//     } else {
//       if (this.state.role.name.length > 24) {
//         alert.name = "Tên thể loại tối đa 24 ký tự";
//       }
//     }
//     if (
//       !this.state.role.description ||
//       this.state.role.description.length === 0
//     ) {
//       alert.description = "Bạn cần nhập mô tả cho thể loại";
//     } else {
//       if (this.state.role.description > 256) {
//         alert.description = "Mô tả thể loại tối đa 256 ký tự";
//       }
//     }
//     if (alert.name || alert.description) {
//       isValid = false;
//     }
//     this.setState({
//       alert: alert
//     });
//     return isValid;
//   }

//   onAddCategory() {
//     if (this.checkValidation()) {
//       this.setState({
//         loading: true
//       });
//       let category = this.state.category;
//       this.onCloseModal();
//       CategoryApi.add(category)
//         .then(res => {
//           if (res.data.Code === 200) {
//             Toast.success(category.name, "Đã tạo thành công");
//             let data = this.state.data;
//             data.push({
//               Id: res.data.ThongTinBoSung1,
//               TenLoaiTruyen: category.name,
//               MoTa: category.description
//             });
//           } else {
//             Toast.notify(res.data.MsgError);
//           }
//         })
//         .catch(err => {
//           Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
//         })
//         .finally(() => {
//           this.setState({
//             loading: false
//           });
//         });
//     }
//   }
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
    this.setState({
      isEditing: true,
      role: {
        Id: role.Id,
        name: role.TenQuyen
      }
    });
    this.onShowModal();
  }

//   onUpdateCategory() {
//     if (this.checkValidation()) {
//       this.setState({
//         loading: true
//       });
//       let category = this.state.category;
//       this.onCloseModal();
//       CategoryApi.update(category)
//         .then(res => {
//           if (res.data.Code === 200) {
//             Toast.success(category.name, "Cập nhật thể loại thành công");
//             this.state.data.forEach(c => {
//               if (c.Id === category.Id) {
//                 c.TenLoaiTruyen = category.name;
//                 c.MoTa = category.description;
//               }
//             });
//           } else {
//             Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
//           }
//         })
//         .catch(err => {
//           Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
//         })
//         .finally(() => {
//           this.setState({
//             loading: false
//           });
//         });
//     }
//   }

//   onRemoveCategory(category) {
//     Alert.warn(
//       "Bạn có muốn xóa thể loại này không?",
//       category.TenLoaiTruyen + ": " + category.MoTa,
//       () => {
//         this.setState({
//           loading: true
//         });
//         CategoryApi.delete(category)
//           .then(res => {
//             if (res.data.Code && res.data.Code === 200) {
//               Toast.success(category.TenLoaiTruyen, "Đã xóa loại truyện");
//               var newData = [];
//               this.state.data.forEach(c => {
//                 if (c.Id !== category.Id) {
//                   newData.push(c);
//                 }
//               });
//               this.setState({
//                 data: newData
//               });
//             } else {
//               Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
//             }
//           })
//           .catch(err => {
//             Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
//           })
//           .finally(() => {
//             this.setState({
//               loading: false
//             });
//           });
//       },
//       () => {}
//     );
//   }

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
          <Button
            display=" Tạo mới"
            type="btn-Green"
            icon="fa fa-plus-square"
            style="btn-add-cate"
            onClick={() => {
              this.onShowModal();
            }}
          />
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
              value={this.state.isEditing ? this.state.role.name : null}
            />
            <Select
              placeholder="Chọn quyền..."
              isMulti
              options={this.state.permissions}
              value={this.state.role.permissions}
              onChange={v => {
                   this.setFormData("permissions", v);
              }}
            />
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.state.isEditing
                    ? this.onUpdateRole()
                    : this.onAddRole();
                console.log(this.state)
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
