import React, { Component } from "react";
import "./AuthorTable.scss";
import AuthorApi from "../../../api/AuthorApi";
import Progress from "../../../components/commonUI/Progress";
import ReactTable from "react-table";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import Toast from "../../../components/commonUI/Toast";
class AuthorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: 0,
      loading: false,
      openModal: false,
      isEditing: false,
      author: {
        name: ""
      },
      alert: {
        name: ""
      }
    };
  }

  componentDidMount() {
    AuthorApi.list(1)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            data: res.data.Data.listTacGia,
            pages: res.data.Data.Paging.TotalPages
          });
        }
      })
      .catch(err => {});
  }

  loadPage(state, instance) {
    this.setState({
      loading: true
    });
    if (state.filtered[0]) {
      console.log(
        "search=" + state.filtered[0].value + "|page=" + (state.page + 1)
      );
    }
    AuthorApi.list(state.page + 1)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            data: res.data.Data.listTacGia,
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

  setFormData(key, value) {
    var author = this.state.author;
    author[key] = value;
    this.setState({
      author: author,
      alert: {}
    });
  }

  onShowModal() {
    this.setState({
      openModal: true
    });
  }
  onCloseModal() {
    this.setState({
      openModal: false,
      isEditing: false,
      author: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.author.name || this.state.author.name.length === 0) {
      alert.name = "Bạn cần nhập tên tác giả";
    }
    if (alert.name) {
      isValid = false;
      this.setState({
        alert: alert
      });
    }
    return isValid;
  }

  onAddAuthor(author) {
    AuthorApi.add(author)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          Toast.success(author.name, "Đã thêm tác gỉả");
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

  onEditAuthor(author) {
    this.setState({
      author: {
        Id: author.Id,
        name: author.TenTacGia
      },
      isEditing: true
    });
    this.onShowModal();
  }

  onUpdateAuthor(author) {
    AuthorApi.update(author)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          Toast.success(author.name, "Đã cập nhật tác giả");
          this.state.data.forEach(a => {
            if (a.Id === author.Id) a.TenTacGia = author.name;
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

  onSubmitForm() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let author = this.state.author;
      let isEditing = this.state.isEditing;
      this.onCloseModal();
      if (isEditing) {
        this.onUpdateAuthor(author);
      } else {
        this.onAddAuthor(author);
      }
    }
  }

  onRemoveAuthor(author) {
    Alert.warn(
      "Bạn có muốn xóa tác giả này không?",
      author.TenTacGia,
      () => {
        this.setState({
          loading: true
        });
        AuthorApi.delete(author)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(author.TenTacGia, "Đã xóa thành công");
              let newData = [];
              this.state.data.forEach(a => {
                if (a.Id !== author.Id) {
                  newData.push(a);
                }
              });
              this.setState({
                data: newData
              });
            } else Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
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

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "Id",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        maxWidth: 50,
        filterable: false
      },
      {
        Header: "Tên tác giả",
        accessor: "TenTacGia"
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
                  this.onEditAuthor(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  this.onRemoveAuthor(cell.original);
                }}
              />
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>Tác giả</span>
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
              {this.state.isEditing ? "Chỉnh sửa tác giả" : "Thêm tác giả mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên tác giả"
              value={this.state.isEditing ? this.state.author.name : null}
            />

            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.onSubmitForm();
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
          <Progress display="Đang tải dữ liệu" />
        ) : (
          <ReactTable
            columns={columns}
            data={this.state.data}
            pages={this.state.pages}
            loading={this.state.loading}
            LoadingComponent={LoadingCmp}
            showPageSizeOptions={false}
            filterable={true}
            manual
            onFetchData={(state, instance) => {
              this.loadPage(state, instance);
            }}
            sortable={false}
            className="-striped -highlight"
            previousText="Trang trước"
            nextText="Trang tiếp"
            loadingText="Đang tải..."
            noDataText="Không có dữ liệu"
            pageText="Trang"
            ofText="trên"
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

export default AuthorTable;
