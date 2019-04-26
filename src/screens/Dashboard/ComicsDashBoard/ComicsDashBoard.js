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
export default class ComicsDashBoard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: null,
         pages: 0,
         loading: false,
         openModal: false,
         isEditing: false,
         // For temp data in Modal
         comic: {
            name: "",
            anotherName: "",
            status: "",
            frequency: 9,
            authorsName: "",
            genres: "",
            releasedDate: "",
            coverPicture: "",
            avatarPicture: "",
            groupName: "",
            description: "",
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
      // if (state.filtered[1] && state.filtered[1].value.trim().length !== 0) {
      //    ComicApi.search(state.filtered[0].value, state.page + 1)
      //       .then(res => {
      //          if (res.data.Code && res.data.Code === 200) {
      //             this.setState({
      //                data: res.data.Data.listComic,
      //                pages: res.data.Data.Paging.TotalPages
      //             });
      //          } else {
      //             Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
      //          }
      //       })
      //       .catch(err => {
      //          Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      //       })
      //       .finally(() => {
      //          this.setState({
      //             loading: false
      //          });
      //       });
      // } else {
      //    ComicApi.list(state.page + 1)
      //       .then(res => {
      //          if (res.data.Code && res.data.Code === 200) {
      //             this.setState({
      //                data: res.data.Data.listTruyen,
      //                pages: res.data.Paging.TotalPages
      //             });
      //          } else {
      //             Toast.notify(res.data.MsgError, "Mã lỗi " + res.data.Code);
      //          }
      //       })
      //       .catch(err => {
      //          Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      //       })
      //       .finally(() => {
      //          this.setState({
      //             loading: false
      //          });
      //       });
      // }
   }

   setFormData(key, value) {
      var comic = this.state.comic;
      comic[key] = value;
      this.setState({
         comic: comic,
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
                  // Id: res.data.ThongTinBoSung1,
                  // Id_Nhom: comic.authorsName,
                  // Id_TrangThai: comic.status,
                  // Id_ChuKy: comic.frequency,
                  // TenTruyen: comic.name,
                  // TenKhac: comic.anotherName,
                  // NamPhatHanh: comic.releasedDate,
                  // AnhBia: comic.coverPicture,
                  // AnhDaiDien: comic.avatarPicture,
                  // MoTa: comic.description
                  Id_Nhom: 3,
                  Id_TrangThai: 7,
                  Id_ChuKy: 9,
                  TenTruyen: "Testing3",
                  TenKhac: "Nope",
                  NamPhatHanh: 2017,
                  AnhBia: "https://juiceboxinteractive.com/app/uploads/2018/05/Color-Cover-960x547.png",
                  AnhDaiDien: "https://juiceboxinteractive.com/app/uploads/2018/05/Color-Cover-960x547.png",
                  MoTa: "Nothing"
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
      this.setState({
         comic: {
            Id: comic.Id,
            name: comic.TenTruyen,
            authorsName: [...comic.TacGia].map(e => e.TenTacGia).join(","),
            anotherName: comic.TenKhac,
            releasedDate: comic.NgayXuatBan,
            coverPicture: comic.AnhBia,
            avatarPicture: comic.AnhDaiDien,
            groupName: comic.Id_Nhom,
            categories: [...comic.TheLoai].map(e => e.TenTheLoai).join(","),
            status: comic.Id_TrangThai,
            // frequency: comic.ChuKyPhatHanh,
            description: comic.MoTa
         },
         isEditing: true
      });
      this.onShowModal();
   }

   // setStateForm(key, value) {
   //    this.setState({
   //       [key]: value
   //    });
   // }

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
                  if(res.data.Code && res.data.Code === 200) {
                     Toast.success(comic.TenTruyen, "Đã xóa truyện");
                     var newData = [];
                     this.state.data.forEach(e => {
                        if(e.Id !== comic.Id) {
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
      )
   }

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
            Cell: cell => <img className="comic-avatar" src={cell.value} />,
            accessor: "AnhDaiDien",
            maxWidth: 120,
            filterable: false
         },
         {
            Header: "Tên truyện",
            sortable: false,
            accessor: "TenTruyen",
            Cell: cell => <Link 
                              to={{
                                 pathname: convertToFriendlyPath(
                                    "/dashboard/comics",
                                    cell.value,
                                    cell.original.Id
                                 ),
                                 state: {
                                    comic: cell.original
                                 }
                              }} 
                          >{cell.value}</Link>
         },
         {
            Header: "Tên nhóm",
            accessor: "TenNhom",
            Cell: cell => <span className="Id-center">{cell.value}</span>,
            sortable: false,
            maxWidth: 150,
            filterable: false
         },
         {
            Header: "Trạng thái truyện",
            accessor: "TenTrangThai",
            Cell: cell => <span className="Id-center">{cell.value}</span>,
            filterable: false,
            maxWidth: 150
         },
         // {
         //    Header: "NXB",
         //    accessor: "NgayXuatBan",
         //    filterable: false,
         //    Cell: cell => <span className="Id-center">{cell.value}</span>,
         //    maxWidth: 70
         // },
         // {
         //    Header: "Mô tả",
         //    accessor:  "MoTa",
         //    filterable: false
         // },
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
      if(this.state.isError) {
         return <Link to="/dashboard/comics">Thử lại</Link>
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
                     {this.state.isEditing
                        ? "Chỉnh sửa truyện"
                        : "Thêm truyện mới"}
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
                     value={
                        this.state.isEditing
                           ? this.state.comic.anotherName
                           : null
                     }
                  />
                  <TextInput
                     id="authorsName"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Tên tác giả"
                     value={
                        this.state.isEditing
                           ? this.state.comic.authorsName
                           : null
                     }
                  />
                  <TextInput
                     id="releasedYear"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Năm phát hành"
                     value={
                        this.state.isEditing
                           ? this.state.comic.releasedDate
                           : null
                     }
                  />
                  {/* <TextInput
                     id="frequency"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Chu kỳ phát hành"
                     value={
                        this.state.isEditing
                           ? this.state.comic.frequency
                           : null
                     }
                  /> */}
                  <TextInput
                     id="coverPicture"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Ảnh bìa"
                     value={
                        this.state.isEditing
                           ? this.state.comic.coverPicture
                           : null
                     }
                  />
                  <TextInput
                     id="avatarPicture"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Ảnh đại diện"
                     value={
                        this.state.isEditing
                           ? this.state.comic.avatarPicture
                           : null
                     }
                  />
                  <TextInput
                     id="groupName"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Nhóm dịch"
                     value={
                        this.state.isEditing ? this.state.comic.groupName : null
                     }
                  />
                  <span>Thể loại</span>
                  <CheckBox
                     display={this.state.comic.categories}
                     id={this.state.comic.Id}
                     // onChanged={(key, value) => this.setStateForm(key, value)}
                  />
                  <TextInput
                     id="status"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Tình trạng"
                     value={
                        this.state.isEditing ? this.state.comic.status : null
                     }
                  />
                  <TextArea
                     id="description"
                     onChanged={(key, value) => {
                        this.setFormData(key, value);
                     }}
                     alert={this.state.alert.name}
                     display="Mô tả"
                     value={
                        this.state.isEditing
                           ? this.state.comic.description
                           : null
                     }
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
