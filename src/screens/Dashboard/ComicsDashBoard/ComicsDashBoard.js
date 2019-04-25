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
            authorsName: "",
            releasedYear: "",
            coverPicture: "",
            avatarPicture: "",
            groupName: ""
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
            }
         })
         .catch(err => {});
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

   onAddComic(comic) {
      ComicApi.add(comic)
         .then(res => {
            if (res.data.Code && res.data.Code === 200) {
               Toast.success(comic.name, "Done");
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
            authorsName: "Fixed",
            anotherName: "Fixed",
            releasedYear: "Fixed",
            coverPicture: "Fixed",
            avatarPicture: comic.AnhDaiDien,
            groupName: comic.TenNhom,
            categories: "Fixed",
            status: "Fixed",
            description: "Fixed"
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
            maxWidth: 80,
            filterable: false
         },
         {
            Header: "Tên truyện",
            sortable: true,
            accessor: "TenTruyen"
         },
         {
            Header: "Tên nhóm",
            accessor: "TenNhom",
            sortable: true,
            filterable: false
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
                        // onClick={() => {
                        //   this.onRemoveAuthor(cell.original);
                        // }}
                     />
                  </div>
               );
            },
            maxWidth: 100
         }
      ];

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
                           ? this.state.comic.releasedYear
                           : null
                     }
                  />
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
                     display={this.state.comic.name}
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
                  ofText="trên"
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
