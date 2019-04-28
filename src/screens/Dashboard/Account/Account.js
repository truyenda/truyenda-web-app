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
import TextArea from "../../../components/commonUI/TextArea";
import Modal from "react-responsive-modal";
import ReactTooltip from "react-tooltip";
import SelectBox from "../../../components/commonUI/SelectBox";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      openModal: false,
      isEditing: false,
      profile: {
        Username: "",
        Email: "",
        IdQuyen: "",
        TenQuyen: "",
        IdNhom: "",
        TenNhom: ""
      },
      alert: {
        Username: "",
        Email: "",
        IdQuyen: "",
        TenQuyen: "",
        IdNhom: "",
        TenNhom: ""
      }
    };
  }
  componentDidMount() {
    AccountListApi.list().then(res => {
      if (res.data.Code === 200) {
        this.setState({
          data: res.data.Data.listTaiKhoan
        });
      } else {
        this.setState({
          error: true
        });
        Toast.notify(res.data.MsgError, "Mã lỗi: " + res.data.Code);
      }
    });
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
        TenNhom: ""
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

  checkValidation() {
    var isValid = true;
    var alert = {};
    if (!this.state.name || this.state.name.length === 0) {
      alert.name = "Tên hiển thị không được để trống";
      isValid = false;
    } else {
      if (this.state.name.length > 32) {
        alert.name = "Tên hiển thị tối đa 32 ký tự";
        isValid = false;
      }
    }
    if (!this.state.birthday || this.state.birthday.length === 0) {
      alert.birthday = "Ngày sinh không được để trống";
      isValid = false;
    } else {
      if (!StringUtils.validateDate(this.state.birthday)) {
        alert.birthday = "Ngày sinh không đúng định dạng";
        isValid = false;
      } else {
        var age = StringUtils.getAge(this.state.birthday);
        if (age <= 10 || age >= 100) {
          alert.birthday = "Tuổi không được chấp nhận";
          isValid = false;
        }
      }
    }
    if (!this.state.cfPassword || this.state.cfPassword.length === 0) {
      alert.cfPassword = "Bạn cần nhập mật khẩu để thực hiện";
      isValid = false;
    }
    if (!this.state.newPassword || this.state.newPassword.length === 0) {
      alert.newPassword = "Mật khẩu không được để trống";
      isValid = false;
    } else {
      if (
        this.state.newPassword.length < 6 ||
        this.state.newPassword.length > 32
      ) {
        alert.newPassword = "Mật khẩu phải ít nhất từ 6 đến 32 ký tự";
        isValid = false;
      }
    }
    if (!this.state.reNewPassword || this.state.reNewPassword.length === 0) {
      alert.reNewPassword = "Bạn cần nhập xác nhận lại mật khẩu";
      isValid = false;
    } else {
      if (this.state.newPassword !== this.state.reNewPassword) {
        alert.rePassword = "Mật khẩu mới không khớp";
        isValid = false;
      }
    }
    this.setState({ alert: alert });
    return isValid;
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
    this.setState({
      isEditing: true,
      profile: {
        Id: profile.Id,
        Username: profile.Username,
        Email: profile.Email,
        IdTrangThai: profile.IdTrangThai,
        IdQuyen: profile.IdQuyen,
        TenQuyen: profile.TenQuyen,
        IdNhom: profile.IdNhom,
        TenNhom: profile.TenNhom
      }
    });
    this.onShowModal();
  }

  onUpdateAccount() {
    if (true) {
      this.setState({
        loading: true
      });
      let profile = this.state.profile;
      this.onCloseModal();
      AccountListApi.update(profile)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(profile.Username, "Cập nhật thể loại thành công");
            this.state.data.forEach(c => {
              if (c.Id === profile.Id) {
                c.Username = profile.Username;
                c.Email = profile.Email;
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
        maxWidth: 50
      },
      {
        Header: "Username",
        accessor: "Username",
        width: 150,
        maxWidth: 150
      },
      {
        Header: "Email",
        accessor: "Email",
        Cell: cell => (
          <span data-for="des-tip" data-tip={cell.value}>
            {cell.value}
            <ReactTooltip multiline={true} id="des-tip" getContent={v => <p className='tip-200'>{v}</p>}/>
          </span>
        )
      },
      {
        Header: "Tên Nhóm",
        accessor: "TenNhom",
        Cell: cell => (
          <span data-for="des-tip" data-tip={cell.value}>
            {cell.value}
            <ReactTooltip multiline={true} id="des-tip" getContent={v => <p className='tip-200'>{v}</p>}/>
          </span>
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
                  this.onEditAccount(cell.original);
                }}
              />
              <i
                className="fas fa-times fa-lg"
                onClick={() => {
                  // this.onRemoveAccount(cell.original);
                }}
              />
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    return (
      <div className="bookmark-container">
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
            {this.state.isEditing
              ? "Chỉnh sửa account"
              : "Tạo account mới"}
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

          <div className="action-group">
            <Button
              display={this.state.isEditing ? "Cập nhật" : "Tạo"}
              type="btn-Green"
              onClick={() => {
                // if (this.state.isEditing) 
                this.onUpdateAccount();
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
            columns={columns}
            LoadingComponent={LoadingCmp}
            loading={this.state.loading}
            sortable={true}
            multiSort={true}
            filterable={true}
            resizable={false}
            previousText="Trang trước"
            nextText="Trang tiếp"
            loadingText="Đang tải..."
            noDataText="Không có dữ liệu"
            pageText="Trang"
            ofText="trên"
            rowsText="user"
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
            defaultPageSize={20}
            onPageChange={p => console.log(p)}
            className="-striped -highlight"
            // minRows={5}
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
