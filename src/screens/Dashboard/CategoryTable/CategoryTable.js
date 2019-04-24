import React, { Component } from "react";
import "./CategoryTable.scss";
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
class CategoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      openModal: false,
      isEditing: false,
      category: {
        name: "",
        description: ""
      },
      alert: {
        name: "",
        description: ""
      }
    };
  }

  componentDidMount() {
    CategoryApi.list()
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
  }

  clearDataState() {
    this.setState({
      category: { name: "", description: "" },
      alert: {},
      isEditing: false
    });
  }

  setFormData(key, value) {
    var category = this.state.category;
    category[key] = value;
    this.setState({
      category: category
    });
    this.setState({
      alert: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.category.name || this.state.category.name.length === 0) {
      alert.name = "Bạn cần nhập tên thể loại";
    } else {
      if (this.state.category.name.length > 24) {
        alert.name = "Tên thể loại tối đa 24 ký tự";
      }
    }
    if (
      !this.state.category.description ||
      this.state.category.description.length === 0
    ) {
      alert.description = "Bạn cần nhập mô tả cho thể loại";
    } else {
      if (this.state.category.description > 256) {
        alert.description = "Mô tả thể loại tối đa 256 ký tự";
      }
    }
    if (alert.name || alert.description) {
      isValid = false;
    }
    this.setState({
      alert: alert
    });
    return isValid;
  }

  onAddCategory() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let category = this.state.category;
      this.onCloseModal();
      CategoryApi.add(category)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(category.name, "Đã tạo thành công");
            let data = this.state.data;
            data.push({
              Id: res.data.ThongTinBoSung1,
              TenLoaiTruyen: category.name,
              MoTa: category.description
            });
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

  onEditCategory(category) {
    this.setState({
      isEditing: true,
      category: {
        Id: category.Id,
        name: category.TenLoaiTruyen,
        description: category.MoTa
      }
    });
    this.onShowModal();
  }

  onUpdateCategory() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let category = this.state.category;
      this.onCloseModal();
      CategoryApi.update(category)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(category.name, "Cập nhật thể loại thành công");
            this.state.data.forEach(c => {
              if (c.Id === category.Id) {
                c.TenLoaiTruyen = category.name;
                c.MoTa = category.description;
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

  onRemoveCategory(category) {
    Alert.warn(
      "Bạn có muốn xóa thể loại này không?",
      category.TenLoaiTruyen + ": " + category.MoTa,
      () => {
        this.setState({
          loading: true
        });
        CategoryApi.delete(category)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(category.TenLoaiTruyen, "Đã xóa loại truyện");
              var newData = [];
              this.state.data.forEach(c => {
                if (c.Id !== category.Id) {
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

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "Id",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        width: 50,
        maxWidth: 50
      },
      {
        Header: "Tên thể loại",
        accessor: "TenLoaiTruyen",
        width: 150,
        maxWidth: 150
      },
      { Header: "Mô tả", accessor: "MoTa" },
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
                  this.onEditCategory(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  this.onRemoveCategory(cell.original);
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
          <span>Thể loại truyện</span>
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
            classNames={{ modal: "modal-add-cate" }}
            open={this.state.openModal}
            onClose={() => {
              this.onCloseModal();
            }}
            center
          >
            <h2>
              {this.state.isEditing
                ? "Chỉnh sửa thể loại"
                : "Tạo thẻ thể loại mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên thể loại"
              value={this.state.isEditing ? this.state.category.name : null}
            />
            <TextArea
              id="description"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.description}
              display="Mô tả"
              value={
                this.state.isEditing ? this.state.category.description : null
              }
            />
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.state.isEditing
                    ? this.onUpdateCategory()
                    : this.onAddCategory();
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
            rowsText="thể loại"
            
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

export default CategoryTable;
