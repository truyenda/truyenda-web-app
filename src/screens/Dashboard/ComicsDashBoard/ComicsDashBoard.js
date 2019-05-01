import React, { Component } from "react";
import "./ComicsDashBoard.scss";
import Button from "../../../components/commonUI/Button";
import ReactTable from "react-table";
import Progress from "../../../components/commonUI/Progress";
import Modal from "react-responsive-modal";
import Alert from "../../../components/commonUI/Alert";
import CheckBox from "../../../components/commonUI/CheckBox";
import { Link } from "react-router-dom";
import TextInput from "../../../components/commonUI/TextInput";
import TextArea from "../../../components/commonUI/TextArea";
// import ReactTooltip from "react-tooltip";
import Toast from "../../../components/commonUI/Toast";
import ComicApi from "../../../api/ComicApi";
import { convertToFriendlyPath } from "../../../utils/StringUtils";
import FilePicker from "../../../components/commonUI/FilePicker";
import PhotoApi from "../../../api/PhotoApi";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";
import TeamApi from "../../../api/TeamApi";
import CategoryApi from "../../../api/CategoryApi";
import StoryStatusApi from "../../../api/StoryStatusApi";
import Photo from "../../../components/commonUI/Photo";
import FrequencyApi from "../../../api/FrequencyApi";
import { toComicLink, toComicDashboardLink } from "../../../utils/LinkUtils";
export default class ComicsDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: 0,
      loading: false,
      openModal: false,
      isEditing: false,
      categories: [],
      sstatus: [],
      frequencies: [],
      // For temp data in Modal
      comic: {
        name: "",
        anotherName: "",
        authorsName: "",
        categories: [],
        statusId: "",
        statusName: "",
        releasedDate: "",
        frequencyId: "",
        frequencyName: "",
        coverPicture: "",
        avatarPicture: "",
        groupName: "",
        team: {
           Id: '',
           name: '',
        },
        description: ""
      },
      alert: {
        name: ""
      }
    };
  }

  componentDidMount() {
    ComicApi.list(1)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          this.setState({
            data: res.data.Data.listTruyen,
            pages: res.data.Data.Paging.TotalPages
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
    this.getCategory();
    this.getStoryStatus();
    this.getFrequency();
  }

  componentWillUpdate() {
    if (document.getElementsByClassName("rt-th")[8])
      document
        .getElementsByClassName("rt-th")[8]
        .getElementsByTagName("input")[0]
        .setAttribute("placeholder", "Tìm truyện");
  }

  loadPage(state, instance) {
    this.setState({
      loading: true
    });
    if (state.filtered[0] && state.filtered[0].value.trim().length !== 0) {
      ComicApi.search(state.filtered[0].value, state.page + 1)
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.setState({
              data: res.data.Data.listComic,
              pages: res.data.Data.Paging.TotalPages
            });
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Có lỗi trong quá trình kết nối máy chủ");
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      ComicApi.list(state.page + 1)
        .then(res => {
          if (res.data.Code && res.data.Code === 200) {
            this.setState({
              data: res.data.Data.listTruyen,
              pages: res.data.Data.Paging.TotalPages
            });
          } else {
            Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
          }
        })
        .catch(err => {
          Toast.error("Có lỗi trong quá trình kết nối máy chủ");
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  setFormData(key, value) {
    var comic = this.state.comic;
    comic[key] = value;
    this.setState({
      comic: comic,
    });
    this.setState({
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
      comic: {}
    });
  }

  //TODO: Check validation

  //TODO: Add

  onAddComic() {
    let comic = this.state.comic;
    this.onCloseModal();
    ComicApi.add(comic)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          Toast.success(comic.name, "Done");
          let data = this.state.data;
          data.push({
            TenTruyen: comic.name,
            TenKhac: comic.anotherName,
            TheLoai: comic.categories,
            TacGia: comic.authorsName,
            Id_TrangThai: comic.statusId,
            NamPhatHanh: comic.releasedDate,
            Id_ChuKy: comic.frequencyId,
            AnhBia: comic.coverPicture,
            AnhDaiDien: comic.avatarPicture,
            MoTa: comic.description
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

  //TODO: Edit

  onEditComic(comic) {
      const transformCategory = (originCategories)=>{
         let data = [];
         originCategories.forEach(oc => {
            data.push({label: oc.TenTheLoai, value: oc.Id});
         });
         return data;
      }
      const getFrequencyById = (Id) => {
         let data = []
         this.state.frequencies.forEach(frequency => {
            if(frequency.value === Id){
               data = frequency;
            }
         });
         return data;
      }
    this.setState({
      comic: {
        Id: comic.Id,
        name: comic.TenTruyen,
        authorsName: [...comic.DanhSachTacGia].map(e => e.TenTacGia).join(","),
        anotherName: comic.TenKhac,
        releasedDate: comic.NamPhatHanh,
        coverPicture: comic.AnhBia,
        avatarPicture: comic.AnhDaiDien,
        team: {
           value: comic.Id_Nhom,
           label: comic.TenNhom
        },
        categories: transformCategory(comic.DanhSachTheLoai),
        status: {label: comic.TrangThai, value: comic.Id_TrangThai},
        frequency: getFrequencyById(comic.Id_ChuKy),
        description: comic.MoTa
      },
      isEditing: true
    });
    this.onShowModal();
  }

  setStateForm(key, value) {
     this.setState({
        [key]: value
     });
  }

  //TODO: Update
  //TODO: Submit
  //TODO: Remove

  onRemoveComic(comic) {
    Alert.warn(
      "Bạn có muốn xóa truyện này không?",
      comic.TenTruyen,
      () => {
        this.setState({
          loading: true
        });
        ComicApi.delete(comic)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(comic.TenTruyen, "Đã xóa truyện");
              var newData = [];
              this.state.data.forEach(e => {
                if (e.Id !== comic.Id) {
                  newData.push(e);
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

  getTeam(key, callback) {
    if (key.length === 0) return null;
    TeamApi.search(key, 1).then(res => {
      let data = [];
      res.data.Data.listNhomDich.forEach(team => {
        data.push({ label: team.TenNhomDich, value: team.Id });
      });
      callback(data);
    });
  }

  getCategory() {
    let data = [];
    CategoryApi.list()
      .then(res => {
        res.data.Data.forEach(category => {
          data.push({ label: category.TenLoaiTruyen, value: category.Id });
        });
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          categories: data
        });
      });
  }

  getStoryStatus() {
    let data = [];
    StoryStatusApi.list()
      .then(res => {
        res.data.Data.forEach(sstatus => {
          data.push({ label: sstatus.TentrangThai, value: sstatus.Id });
        });
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          sstatus: data
        });
      });
  }

  getFrequency() {
    let data = [];
    FrequencyApi.list()
      .then(res => {
        res.data.Data.forEach(frequency => {
          data.push({ label: frequency.TenChuKy, value: frequency.Id });
        });
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          frequencies: data
        });
      });
  }

  // getFrequencyById(Id) {
  //   let data = [];
  //   this.state.frequencies.forEach(frequency => {
  //     if(frequency.value.toString() === Id.toString()) {
  //       data = frequency;
  //     }
  //   });
  //   return data;
  // }

  // getStatusById(Id) {
  //   let data = [];
  //   this.state.sstatus.forEach(status => {
  //     if(frequency.value.toString() === Id.toString()) {
  //       data = status;
  //     }
  //   });
  //   return data;
  // }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "Id",
        maxWidth: 50,
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        filterable: false
      },
      {
        Header: "Ảnh truyện",
        Cell: cell => <Photo className="comic-avatar" src={cell.value} />,
        accessor: "AnhDaiDien",
        maxWidth: 120,
        filterable: false
      },
      {
        Header: "Tên truyện",
        sortable: false,
        accessor: "TenTruyen",
        Cell: cell => (
          <Link
            to={{
              pathname: toComicDashboardLink(
                cell.value,
                cell.original.Id
              ),
              state: {
                comic: cell.original
              }
            }}
          >
            {cell.value}
          </Link>
        )
      },
      {
        Header: "Tên nhóm dịch",
        accessor: "TenNhom",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        sortable: false,
        maxWidth: 150,
        filterable: false
      },
      {
        Header: "Trạng thái truyện",
        accessor: "TrangThai",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        filterable: false,
        maxWidth: 150
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
                  this.onEditComic(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  this.onRemoveComic(cell.original);
                }}
              />
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    if (this.state.isError) {
      return <Link to="/dashboard/comics">Thử lại</Link>;
    }
    return (
      <div className="comics-dashboard-container">
        <div className="tb-name-wrap">
          <span>Danh sách Truyện</span>
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
            classNames={{ modal: "modal-add-comic" }}
            open={this.state.openModal}
            onClose={() => {
              this.onCloseModal();
            }}
            center
          >
            <h2>
              {this.state.isEditing ? "Chỉnh sửa truyện" : "Thêm truyện mới"}
            </h2>
            <TextInput
              id="name"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên truyện"
              value={this.state.isEditing ? this.state.comic.name : null}
            />
            <TextInput
              id="anotherName"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.anotherName}
              display="Tên khác"
              value={this.state.isEditing ? this.state.comic.anotherName : null}
            />
            <TextInput
              id="authorsName"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Tên tác giả"
              value={this.state.isEditing ? this.state.comic.authorsName : null}
            />
            <TextInput
              id="releasedDate"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Năm phát hành"
              value={
                this.state.isEditing ? this.state.comic.releasedDate : null
              }
            />
            {/* INPUT LINK FOR COMIC AVATAR */}
            <div className="photo-form">
              <div className="photo-display-container">
                <Photo
                  src={
                    this.state.comic.avatarPicture
                      ? this.state.comic.avatarPicture
                      : ""
                  }
                  className="photo"
                />
                {this.state.uploading && (
                  <div className="loadingcmp">
                    <Progress />
                  </div>
                )}
              </div>
              <div className="photo-input">
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
                          let comic = this.state.comic;
                          comic.avatarPicture = res.data.link;
                          this.setState({
                            uploading: false,
                            comic: comic,
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
                      id="avatarPicture"
                      name="avatarPicture"
                      placeholder=" "
                      onChange={event =>
                        this.setFormData("avatarPicture", event.target.value)
                      }
                      value={this.state.comic.avatarPicture}
                    />
                    <span>Ảnh đại diện</span>
                  </label>
                  <div
                    className={
                      "field-alert " +
                      (this.state.alert.avatarPicture ? "" : "hide")
                    }
                  >
                    <p>{this.state.alert.avatarPicture}</p>
                  </div>
                </div>
              </div>
            </div>
            {/*INPUT LINK FOR COMIC COVER */}
            <div className="photo-form">
              <div className="photo-display-container">
                <Photo
                  src={
                    this.state.comic.coverPicture
                      ? this.state.comic.coverPicture
                      : ""
                  }
                  className="photo cover"
                />
                {this.state.coveruploading && (
                  <div className="loadingcmp">
                    <Progress />
                  </div>
                )}
              </div>
              <div className="photo-input">
                <FilePicker
                  multiple={false}
                  mSize={2}
                  onAccept={files => {
                    files.forEach(file => {
                      this.setState({
                        coveruploading: true
                      });
                      PhotoApi(file)
                        .then(res => {
                          let comic = this.state.comic;
                          comic.coverPicture = res.data.link;
                          this.setState({
                            coveruploading: false,
                            comic: comic,
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
                      id="coverPicture"
                      name="coverPicture"
                      placeholder=" "
                      onChange={event =>
                        this.setFormData("coverPicture", event.target.value)
                      }
                      value={this.state.comic.coverPicture}
                    />
                    <span>Ảnh bìa</span>
                  </label>
                  <div
                    className={
                      "field-alert " +
                      (this.state.alert.coverPicture ? "" : "hide")
                    }
                  >
                    <p>{this.state.alert.coverPicture}</p>
                  </div>
                </div>
              </div>
            </div>
            <AsyncSelect
              cacheOptions
              loadOptions={(v, c) => {
                this.getTeam(v, c);
              }}
              placeholder="Chọn nhóm..."
              value={this.state.comic.team}
              onChange={v => {
                this.setFormData("IdTeam", v);
              }}
            />
            <div>
              <Select
                placeholder="Chọn thể loại..."
                isMulti
                options={this.state.categories}
                value={this.state.comic.categories} 
                onChange={v => {
                  this.setFormData("categories", v);
                }}
              />
              <div
                className={
                  "field-alert " + (this.state.alert.coverPicture ? "" : "hide")
                }
              >
                <p>{this.state.alert.coverPicture}</p>
              </div>
            </div>
            <Select
              placeholder="Chọn trạng thái truyện..."
              options={this.state.sstatus}
              value={this.state.comic.statusName}
              onChange={v => {
                this.setFormData("statusName", v);
                this.setFormData("statusId", v.value);
              }}
            />
            <Select
              placeholder="Chọn chu kỳ phát hành..."
              options={this.state.frequencies}
              value={this.state.comic.frequencyName}
              onChange={v => {
                this.setFormData("frequencyName", v);
                this.setFormData("frequencyId", v.value);
              }}
            />
            <TextArea
              id="description"
              onChanged={(key, value) => {
                this.setFormData(key, value);
              }}
              alert={this.state.alert.name}
              display="Mô tả"
              value={this.state.isEditing ? this.state.comic.description : null}
            />
            <div className="action-group">
              <Button
                display={this.state.isEditing ? "Cập nhật" : "Tạo"}
                type="btn-Green"
                onClick={() => {
                  this.onAddComic();
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
          <Progress display="Đang tải truyện" />
        ) : (
          <ReactTable
            columns={columns}
            data={this.state.data}
            pages={this.state.pages}
            loading={this.state.loading}
            LoadingComponent={LoadingComponent}
            showPageSizeOptions={false}
            filterable={true}
            defaultPageSize={20}
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
            resizable={false}
            ofText="trên"
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
                desc: !false
              }
            ]}
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

const LoadingComponent = props => {
  return props.loading ? (
    <div className="loadingcmp">
      <Progress />
    </div>
  ) : (
    ""
  );
};
