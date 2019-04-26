import React, { Component } from "react";
import ReactTable from "react-table";
import StoryStatusApi from "../../../api/StoryStatusApi.js";
import Toast from "../../../components/commonUI/Toast";
import Progress from "../../../components/commonUI/Progress";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import { Link } from "react-router-dom";

class StoryStatusTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      openModal: false,
      isEditing: false,
      sstatus: {
        name: ""
      },
      alert: {
        name: ""
      }
    };
  }

  componentDidMount() {
    StoryStatusApi.list()
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
      sstatus: { name: "" },
      alert: {},
      isEditing: false
    });
  }

  setFormData(key, value) {
    var sstatus = this.state.sstatus;
    sstatus[key] = value;
    this.setState({
      sstatus: sstatus
    });
    this.setState({
      alert: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.sstatus.name || this.state.sstatus.name.length === 0) {
      alert.name = "Bạn cần nhập tên chu kỳ";
    } else {
      if (this.state.sstatus.name.length > 24) {
        alert.name = "Tên chu kỳ tối đa 24 ký tự";
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

  onAddStoryStatus() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let sstatus = this.state.sstatus;
      this.onCloseModal();
      StoryStatusApi.add(sstatus.name)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(sstatus.name, "Đã tạo thành công");
            let data = this.state.data;
            data.push({
              Id: res.data.ThongTinBoSung1,
              TentrangThai: sstatus.name
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

  onEditStoryStatus(sstatus) {
    this.setState({
      isEditing: true,
      sstatus: {
        Id: sstatus.Id,
        name: sstatus.TentrangThai
      }
    });
    this.onShowModal();
  }

  onUpdateStoryStatus() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let sstatus = this.state.sstatus;
      this.onCloseModal();
      StoryStatusApi.update(sstatus)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(sstatus.name, "Cập nhật chu kỳ thành công");
            this.state.data.forEach(s => {
              if (s.Id === sstatus.Id) {
                s.TentrangThai = sstatus.name;
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

  onRemoveStoryStatus(sstatus) {
    Alert.warn(
      "Bạn có muốn xóa thể loại này không?",
      sstatus.TentrangThai,
      () => {
        this.setState({
          loading: true
        });
        StoryStatusApi.delete(sstatus)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(sstatus.TentrangThai, "Đã xóa trạng thái truyện");
              var newData = [];
              this.state.data.forEach(s => {
                if (s.Id !== sstatus.Id) {
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
        Header: "Tên trạng thái",
        accessor: "TentrangThai",
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm trạng thái"
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
                  this.onEditStoryStatus(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  this.onRemoveStoryStatus(cell.original);
                }}
              />
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    if (this.state.isError) {
      return <Link to="/dashboard/storystatus">Thử lại</Link>;
    }
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>Trạng thái truyện</span>
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
              {this.state.isEditing
                ? "Chỉnh sửa trạng thái"
                : "Tạo trạng thái mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên trạng thái"
              value={this.state.isEditing ? this.state.sstatus.name : null}
            />
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.state.isEditing
                    ? this.onUpdateStoryStatus()
                    : this.onAddStoryStatus();
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

export default StoryStatusTable;
