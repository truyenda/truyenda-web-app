import React, { Component } from "react";
import ReactTable from "react-table";
import FrequencyApi from "../../../api/FrequencyApi.js";
import Toast from "../../../components/commonUI/Toast";
import Progress from "../../../components/commonUI/Progress";
import Button from "../../../components/commonUI/Button";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

class FrequencyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      openModal: false,
      isEditing: false,
      frequency: {
        name: ""
      },
      alert: {
        name: ""
      }
    };
  }

  componentDidMount() {
    FrequencyApi.list()
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
      frequency: { name: "" },
      alert: {},
      isEditing: false
    });
  }

  setFormData(key, value) {
    var frequency = this.state.frequency;
    frequency[key] = value;
    this.setState({
      frequency: frequency
    });
    this.setState({
      alert: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.frequency.name || this.state.frequency.name.length === 0) {
      alert.name = "Bạn cần nhập tên chu kỳ";
    } else {
      if (this.state.frequency.name.length > 24) {
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

  onAddFrequency() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let frequency = this.state.frequency;
      this.onCloseModal();
      FrequencyApi.add(frequency.name)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(frequency.name, "Đã tạo thành công");
            let data = this.state.data;
            data.push({
              Id: res.data.ThongTinBoSung1,
              TenChuKy: frequency.name
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

  onEditFrequency(frequency) {
    this.setState({
      isEditing: true,
      frequency: {
        Id: frequency.Id,
        name: frequency.TenChuKy
      }
    });
    this.onShowModal();
  }

  onUpdateFrequency() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let frequency = this.state.frequency;
      this.onCloseModal();
      FrequencyApi.update(frequency)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(frequency.name, "Cập nhật chu kỳ thành công");
            this.state.data.forEach(f => {
              if (f.Id === frequency.Id) {
                f.TenChuKy = frequency.name;
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

  onRemoveFrequency(frequency) {
    Alert.warn(
      "Bạn có muốn xóa thể loại này không?",
      frequency.TenChuKy,
      () => {
        this.setState({
          loading: true
        });
        FrequencyApi.delete(frequency)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(frequency.TenChuKy, "Đã xóa loại truyện");
              var newData = [];
              this.state.data.forEach(f => {
                if (f.Id !== frequency.Id) {
                  newData.push(f);
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
        Header: "Tên chu kỳ",
        accessor: "TenChuKy",
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm chu kỳ"
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
                  this.onEditFrequency(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  this.onRemoveFrequency(cell.original);
                }}
              />
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    if (this.state.isError) {
      return <Link to="/dashboard/frequencies">Thử lại</Link>;
    }
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>Chu kỳ truyện</span>
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
              {this.state.isEditing ? "Chỉnh sửa chu kỳ" : "Tạo chu kỳ mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên chu kỳ"
              value={this.state.isEditing ? this.state.frequency.name : null}
            />
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.state.isEditing
                    ? this.onUpdateFrequency()
                    : this.onAddFrequency();
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

export default FrequencyTable;
