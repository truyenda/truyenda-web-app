import React, { Component } from "react";
import Button from "../../../components/commonUI/Button";
import ReactTable from "react-table";
import Modal from "react-responsive-modal";
import TextInput from "../../../components/commonUI/TextInput";
import Select from "react-select";
import "./MyTeam.scss";
import Alert from "../../../components/commonUI/Alert";
import Toast from "../../../components/commonUI/Toast";
class MyTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      team: {
        name: "The best"
      },
      member: {
        name: null,
        permissions: null
      },
      showAddMem: false,
      showPerMen: false,
      permissions: []
    };
  }

  componentDidMount() {
    if (this.props.IdTeam) {
      //TODO: get team info from Id
    } else {
      //TODO: fetch api myteam
    }
    this.getPermissions();
  }

  componentDidUpdate() {
    if (document.getElementsByClassName("rt-th")[4]) {
      if (
        document
          .getElementsByClassName("rt-th")[4]
          .getElementsByTagName("input")
      )
        if (
          document
            .getElementsByClassName("rt-th")[4]
            .getElementsByTagName("input")[0]
        )
          document
            .getElementsByClassName("rt-th")[4]
            .getElementsByTagName("input")[0]
            .setAttribute("placeholder", "Tìm thành viên");
    }
  }

  onShowAddMember() {
    this.setState({ showAddMem: true });
  }
  onCloseAddMember() {
    this.setState({ showAddMem: false });
  }
  onShowPerMember() {
    this.setState({ showPerMen: true });
  }
  onClosePerMember() {
    this.setState({ showPerMen: false });
  }

  getPermissions() {
    //TODO: get permissions for team member set state to permissions
  }

  setFromData(key, value) {
    let member = this.state.member;
    member[key] = value;
    this.setState({ member });
  }

  onRemoveMember(member) {
    Alert.warn(
      "Bạn có muốn xóa thành viên này khỏi nhóm?",
      member.name,
      () => {
        Toast.success(member.name);
      },
      () => {}
    );
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
      { Header: "Tên thành viên", accessor: "name" },
      {
        Header: "",
        maxWidth: 100,
        Cell: cell => (
          <div className="action-group">
            <i
              className="fas fa-user-tag"
              onClick={() => {
                this.onShowPerMember(cell.original);
              }}
            />
            <i
              className="fas fa-times fa-lg"
              onClick={() => {
                this.onRemoveMember(cell.original);
              }}
            />
          </div>
        ),
        filterable: false
      }
    ];
    return (
      <div className="dashboard-table">
        <div className="tb-name-wrap">
          <span>{this.state.team.name}</span>
          <Modal
            onClose={() => this.onCloseAddMember()}
            open={this.state.showAddMem}
            classNames={{ modal: "modal-add-mem" }}
          >
            <h2>Thêm thành viên vào nhóm</h2>
            <TextInput display="Tên thành viên" />
            <div className="action-group">
              <Button type="btn-Green" display="Thêm" />
              <Button
                type="btn-Gray"
                display="Hủy"
                onClick={() => this.onCloseAddMember()}
              />
            </div>
          </Modal>
          <Modal
            onClose={() => this.onClosePerMember()}
            open={this.state.showPerMen}
            classNames={{ modal: "modal-per-mem" }}
          >
            <h2>this.state.member.name</h2>
            <Select
              options={this.state.permissions}
              isMulti
              value={this.state.member.permissions}
              onChange={v => this.setFromData("permissions", v)}
            />
            <div className="action-group">
              <Button
                type="btn-ok"
                display="Cập nhật"
                onClick={() => {
                  console.log(this.state);
                }}
              />
              <Button
                type="btn-Gray"
                display="Hủy"
                onClick={() => this.onClosePerMember()}
              />
            </div>
          </Modal>
        </div>
        <div className="btn-add-wrapper">
          <Button
            display=" Thông tin nhóm"
            icon="fas fa-info"
            style="btn-team-info"
          />
          <Button
            display=" Thêm thành viên"
            type="btn-Green"
            icon="fas fa-user-plus"
            style="btn-add-cate"
            onClick={() => {
              this.onShowAddMember();
            }}
          />
        </div>
        <ReactTable
          columns={columns}
          data={[{ Id: 1, name: "A" }]}
          loading={this.state.loading}
          LoadingComponent={LoadingCmp}
          showPageSizeOptions={false}
          filterable={true}
          resizable={false}
          defaultPageSize={20}
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
          getTdProps={() => ({
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }
          })}
        />
      </div>
    );
  }
}

export default MyTeam;

const LoadingCmp = props => {
  return props.loading ? (
    <div className="loadingcmp">
      <Progress />
    </div>
  ) : (
    ""
  );
};
