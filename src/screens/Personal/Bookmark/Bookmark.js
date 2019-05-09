import React, { Component } from "react";
import "./Bookmark.scss";
import ReactTable from "react-table";
import Progress from "../../../components/commonUI/Progress";
import { Link } from "react-router-dom";
import BookmarkApi from "../../../api/BookmarkApi.js";
import Toast from "../../../components/commonUI/Toast";
import Alert from "../../../components/commonUI/Alert";
import ThumbToolTip from "../../../components/ThumbToolTip";
import ReactTooltip from "react-tooltip";
import {
  toChapterLink,
  toComicLink,
  toTeamLink
} from "../../../utils/LinkUtils";
class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false
    };
  }
  componentDidMount() {
    document.title = "Danh sách truyện theo dõi của bạn";
    BookmarkApi.list().then(res => {
      if (res.data.Code === 200) {
        this.setState({
          data: res.data.Data.ListBookmark
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
  updateBookmark(bookmark) {
    this.toggleLoading(true);
    BookmarkApi.update(bookmark.Id_BookMark, bookmark.Id_ChuongMoiNhat)
      .then(res => {
        if (res.data.Code === 200) {
          Toast.success("Đã đánh dấu truyện " + bookmark.TenTruyen);
          this.setDataChange(bookmark);
        } else {
          Toast.notify(res.data.MsgError);
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      })
      .finally(() => {
        this.toggleLoading(false);
      });
  }

  setDataChange(bookmark) {
    var bookmarks = this.state.data;
    bookmarks.forEach(b => {
      if (b.Id_BookMark === bookmark.Id_BookMark) {
        b.Id_ChuongDanhDau = b.Id_ChuongMoiNhat;
        b.TenChuongDanhDau = b.TenChuongMoiNhat;
      }
    });
    this.setState({
      data: bookmarks
    });
  }

  onRemoveBookmark(bookmark) {
    Alert.warn(
      "Bỏ theo dõi truyện",
      bookmark.TenTruyen,
      () => {
        this.removeBookmark(bookmark);
      },
      () => {}
    );
  }

  removeBookmark(bookmark) {
    this.toggleLoading(true);
    BookmarkApi.delete(bookmark.Id_BookMark)
      .then(res => {
        if (res.data.Code === 200) {
          Toast.success("Đã bỏ theo dõi " + bookmark.TenTruyen);
          var listBookmark = [];
          this.state.data.forEach(bm => {
            if (bm.Id_BookMark != bookmark.Id_BookMark) {
              listBookmark.push(bm);
            }
          });
          this.setState({
            data: listBookmark
          });
        } else {
          Toast.notify(res.data.MsgError);
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kêt nối máy chủ");
      })
      .finally(() => {
        this.toggleLoading(false);
      });
  }

  render() {
    if (this.state.error) {
      return <Link to="/personal/comics">Thử lại</Link>;
    }
    const columns = [
      {
        Header: () => (
          <span>
            <strong>
              <i className="fab fa-amilia" /> Tên truyện
            </strong>
          </span>
        ),
        minWidth: 200,
        accessor: "TenTruyen",
        Cell: row => {
          return (
            <Link
              to={toComicLink(row.value, row.original.Id_Truyen)}
              data-for={"thumb-tip" + row.original.Id_Truyen}
              data-tip={row.original}
            >
              {row.value}
              <ReactTooltip
                multiline={true}
                id={"thumb-tip" + row.original.Id_Truyen}
                effect="solid"
                getContent={v => <ThumbToolTip showImg Id={row.original.Id_Truyen}/>}
              />
            </Link>
          );
        }
      },
      {
        Header: () => (
          <strong>
            <i className="fas fa-users-cog" /> Nhóm dịch
          </strong>
        ),
        minWidth: 100,
        maxWidth: 200,
        accessor: "TenNhom",
        Cell: row => {
          return (
            <Link to={toTeamLink(row.value, row.original.Id_NhomDich)}>
              {row.value}
            </Link>
          );
        }
      },
      {
        Header: () => (
          <strong>
            <i className="fas fa-clipboard-check" /> Chương đánh dấu
          </strong>
        ),
        accessor: "TenChuongDanhDau",
        Cell: row => {
          if (row.value)
            return (
              <Link
                to={toChapterLink(
                  row.original.TenTruyen,
                  row.value,
                  row.original.Id_ChuongDanhDau
                )}
              >
                {row.value}
              </Link>
            );
          else return <i>Chưa đánh dấu</i>;
        }
      },
      {
        Header: props => (
          <span>
            <strong>
              <i className="fas fa-level-up-alt" /> Chương mới nhất
            </strong>
          </span>
        ),
        accessor: "TenChuongMoiNhat",
        Cell: row => {
          if (row.value)
            return (
              <Link
                to={toChapterLink(
                  row.original.TenTruyen,
                  row.value,
                  row.original.Id_ChuongMoiNhat
                )}
              >
                {row.value}
              </Link>
            );
          else return <i>Chưa có</i>;
        }
      },
      {
        Header: "",
        width: 100,
        sortable: false,
        filterable: false,
        Cell: row => {
          return (
            <div className="action-group-bookmark">
              {row.original.Id_ChuongMoiNhat ? (
                row.original.Id_ChuongDanhDau !==
                row.original.Id_ChuongMoiNhat ? (
                  <i
                    className="fas fa-check check"
                    onClick={() => {
                      this.updateBookmark(row.original);
                    }}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <i
                className="fas fa-times fa-lg delete"
                onClick={() => {
                  this.onRemoveBookmark(row.original);
                }}
              />
            </div>
          );
        }
      }
    ];
    return (
      <div className="bookmark-container">
        <div className="tb-name-wrap">
          <span>Danh sách truyện theo dõi</span>
        </div>
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
            rowsText="truyện"
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
                id: "TenTruyen",
                desc: !true
              }
            ]}
            defaultPageSize={20}
            onPageChange={p => console.log(p)}
            className="-striped -highlight"
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

const LoadingCmp = props => {
  return props.loading ? (
    <div className="loadingcmp">
      <Progress />
    </div>
  ) : (
    ""
  );
};

export default Bookmark;
