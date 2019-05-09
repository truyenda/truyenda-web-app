import React, { Component } from "react";
import Button from "../../../components/commonUI/Button";
import Modal from "react-responsive-modal";
import TextInput from "../../../components/commonUI/TextInput";
import FilePicker from "../../../components/commonUI/FilePicker";
import PhotoApiv2 from "../../../api/PhotoApiv2";
import "./ComicDetailsTable.scss";
import ChapterApi from "../../../api/ChapterApi";
import Toast from "../../../components/commonUI/Toast";
import Alert from "../../../components/commonUI/Alert";
import { Link } from "react-router-dom";
import { toChapterLink } from "../../../utils/LinkUtils";
import ReactTable from "react-table";
import Progress from "../../../components/commonUI/Progress";
import { getIdBySplitingPath } from "../../../utils/LinkUtils";
import { convertToPath } from "../../../utils/StringUtils";
import UserAccessFilter from "../../../actions/UserAccessFilter";
export default class ComicDetailsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: this.props.location.state,
      openModal: false,
      data: [],
      files: [],
      links: "",
      loading: true,
      isEditing: false,
      numUploaded: 0,
      numError: 0,
      chapter: {
        IdStory: null,
        Id: null,
        title: null,
        priority: null,
        links: ""
      },
      alert: { title: null, priority: null, links: "" }
    };
  }

  onOpenModal() {
    this.setState({
      openModal: true
    });
  }

  onCloseModal() {
    this.setState({
      openModal: false,
      numUploaded: 0,
      numError: 0,
      chapter: {
        IdStory: null,
        Id: null,
        title: null,
        priority: null,
        links: ""
      },
      files: [],
      isEditing: false,
      alert: {}
    });
  }

  checkValidation() {
    var isValid = true;
    var alert = {};
    function isInt(v) {
      var re = /^-?[0-9]+$/;
      return re.test(v);
    }
    function isFloat(v) {
      var re = /^[-+]?[0-9]+\.[0-9]+$/;
      return re.test(v);
    }
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    function validURL(str) {
      return !!pattern.test(str);
    }
    if (!this.state.chapter.title || this.state.chapter.title.length === 0) {
      alert.title = "Bạn cần nhập tên chương truyện";
    }
    if (
      !this.state.chapter.priority ||
      this.state.chapter.priority.length === 0
    ) {
      alert.priority = "Bạn cần nhập thứ tự cho chương";
    } else {
      if (
        !isInt(this.state.chapter.priority) &&
        !isFloat(this.state.chapter.priority)
      ) {
        alert.priority = "Thứ tự chương là số nguyên hoặc thập phân";
      }
    }
    if (!this.state.chapter.links || this.state.chapter.links.length === 0) {
      alert.links = "Link ảnh của chương không được để trống";
    } else {
      let links = this.state.chapter.links.split("\n");
      for (var i = 0; i < links.length; i++) {
        if (!validURL(links[i])) {
          alert.links = "Link ảnh ở dòng " + (i + 1) + " không hợp lệ";
          break;
        }
      }
    }
    if (alert.title || alert.priority || alert.links) {
      isValid = false;
    }
    this.setState({
      alert: alert
    });
    return isValid;
  }

  onAddChapter() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let chapter = this.state.chapter;
      chapter.IdStory = this.state.comic.comic.Id;
      chapter.links = JSON.stringify(chapter.links.split("\n"));
      this.onCloseModal();
      ChapterApi.create(chapter)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(chapter.title, "Đã tạo thành công");
            let data = this.state.data;
            data.push({
              Id: res.data.ThongTinBoSung1,
              TenChuong: chapter.title,
              SoThuTu: chapter.priority,
              LinkAnh: chapter.links,
              LuotXem: 0,
              NgayTao: "Vừa xong"
            });
            this.setState({
              data: data
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

  onEditChapter(chapter) {
    let chap = this.state.chapter;
    chap.Id = chapter.Id;
    chap.title = chapter.TenChuong;
    chap.priority = chapter.SoThuTu;
    chap.links = null;
    this.setState({
      chapter: chap,
      isEditing: true
    });
    this.onOpenModal();
    ChapterApi.get(chapter.Id)
      .then(res => {
        if (res.data.Code && res.data.Code === 200) {
          chap.links = JsonStrToLinkStr(res.data.Data.LinkAnh);
          this.setState({ chapter: chap });
        } else {
          Toast.notify("Lấy dữ liệu không thành công");
        }
      })
      .catch(err => {
        Toast.error("Có lỗi trong quá trình kết nối");
      });
  }

  setFormData(key, value) {
    var chapter = this.state.chapter;
    chapter[key] = value;
    this.setState({
      chapter: chapter
    });
    this.setState({
      alert: {}
    });
  }

  onUpdateChapter() {
    if (this.checkValidation()) {
      this.setState({
        loading: true
      });
      let chapter = this.state.chapter;
      chapter.IdStory = this.state.comic.comic.Id;
      chapter.links = JSON.stringify(chapter.links.split("\n"));
      this.onCloseModal();
      ChapterApi.update(chapter)
        .then(res => {
          if (res.data.Code === 200) {
            Toast.success(chapter.title, "Đã cập nhật thành công");
            let data = this.state.data;
            data.forEach(c => {
              if (c.Id === chapter.Id) {
                c.TenChuong = chapter.title;
                c.SoThuTu = chapter.priority;
                c.LinkAnh = chapter.links;
              }
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
            loading: false,
            isEditing: false
          });
        });
    }
  }

  onRemoveChapter(chapter) {
    Alert.warn(
      "Bạn có muốn xóa chương này không?",
      chapter.TenChuong,
      () => {
        this.setState({
          loading: true
        });
        ChapterApi.delete(chapter)
          .then(res => {
            if (res.data.Code && res.data.Code === 200) {
              Toast.success(chapter.TenChuong, "Đã xóa chương truyện");
              var newData = [];
              this.state.data.forEach(c => {
                if (c.Id !== chapter.Id) {
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

  componentDidUpdate() {
    if (document.getElementById("links-editor")) {
      TLN.append_line_numbers("links-editor");
      TLN.update_line_numbers(
        document.getElementById("links-editor"),
        document.getElementsByClassName("tln-wrapper")[0]
      );
    }
  }

  componentDidMount() {
    ChapterApi.list(this.state.comic.comic.Id)
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
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  async uploadFile(file, index, isUpdate = false) {
    let files = this.state.files;
    let f = files[index];
    f.isUploading = true;
    f.isSuccess = false;
    f.isError = false;
    f.link = null;
    files[index] = f;
    this.setState({ files: files });
    var link = await PhotoApiv2.upload(file.data, percent => {
      f.percent = percent;
      files[index] = f;
      this.setState({ files });
    }).then(res => {
      return res.secure_url;
    });
    if (link) {
      f.isUploading = false;
      f.isSuccess = true;
      f.isError = false;
      f.link = link;
    } else {
      f.isUploading = false;
      f.isSuccess = false;
      f.isError = true;
    }
    files[index] = f;
    this.setState({ files: files }, () => {
      isUpdate ? this.filesToLinks() : "";
    });
    return link ? true : false;
  }

  async uploadFileList() {
    let isUpdate = this.state.chapter.links.length === 0;
    for (var index = 0; index < this.state.files.length; index++) {
      var isDone = await this.uploadFile(
        this.state.files[index],
        index,
        isUpdate
      );
      if (isDone) {
        this.setState({
          numUploaded: this.state.numUploaded + 1
        });
      } else {
        this.setState({
          numError: this.state.numError + 1
        });
      }
    }
  }

  filesToLinks() {
    var links = "";
    for (var i = 0; i < this.state.files.length; i++) {
      let link = "";
      if (this.state.files[i].link) {
        link = this.state.files[i].link;
      }
      if (i !== 0) {
        links += "\n" + link;
      } else {
        links += link;
      }
    }
    this.setFormData("links", links);
    return links;
  }

  render() {
    const { comic } = this.state.comic;
    const fl = this.state.files.map((file, index) => (
      <div key={index} className="file-list-el">
        <div>
          <span className="num">{index + 1}</span>
          {file.isError && <i className="fas fa-exclamation-circle" />}
          {file.isSuccess && <i className="fas fa-check-circle" />}
          <span className="file-name">{file.data.name}</span>
        </div>
        <div className="link-result">
          <i className="fas fa-long-arrow-alt-right" />
          {file.isError && (
            <span
              className="try-again"
              onClick={() => {
                this.uploadFile(file, index);
              }}
            >
              Thử lại
            </span>
          )}
          {file.isUploading && (
            <span>
              <i className="fas fa-sync fa-spin" /> {file.percent}%
            </span>
          )}
          {file.isSuccess && (
            <span>
              <CopyButton text={file.link} />
              <a className="link" href={file.link}>
                {file.link}
              </a>
            </span>
          )}
        </div>
      </div>
    ));

    const columns = [
      {
        Header: "ID",
        accessor: "Id",
        Cell: cell => <span className="Id-center">{cell.value}</span>,
        maxWidth: 50,
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm theo ID"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
          />
        )
      },
      {
        Header: "Thứ tự",
        accessor: "SoThuTu",
        maxWidth: 80,
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm theo thứ tự"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
          />
        )
      },
      {
        Header: "Tiêu đề",
        accessor: "TenChuong",
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm theo tiêu đề chương"
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
          />
        ),
        Cell: cell => (
          <Link
            to={toChapterLink(
              this.state.comic.comic.TenTruyen,
              cell.value,
              cell.original.Id
            )}
          >
            {cell.value}
          </Link>
        )
      },
      {
        Header: "Ngày tạo",
        accessor: "NgayTao",
        maxWidth: 200,
        Filter: ({ filter, onChange }) => (
          <input
            placeholder="Tìm theo ngày tạo"
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
              {UserAccessFilter("CHAPTER_UDP") && (
                <i
                  className="far fa-edit"
                  onClick={() => {
                    this.onEditChapter(cell.original);
                  }}
                />
              )}
              {UserAccessFilter("CHAPTER_DEL") && (
                <i
                  className="fas fa-times fa-lg"
                  onClick={() => {
                    this.onRemoveChapter(cell.original);
                  }}
                />
              )}
            </div>
          );
        },
        maxWidth: 100
      }
    ];
    return (
      <div className="dashboard-table">
        <h3>{comic.TenTruyen}</h3>
        <div className="button-add">
          {UserAccessFilter("CHAPTER_CRE") && (
            <Button
              display=" Thêm chương"
              type="btn-Green"
              icon="fa fa-plus-square"
              onClick={() => {
                this.onOpenModal();
              }}
            />
          )}
        </div>
        <Modal
          classNames={{ modal: "modal-add-chapter" }}
          open={this.state.openModal}
          onClose={() => {
            this.onCloseModal();
          }}
          center
        >
          <h1>
            {this.state.isEditing
              ? "Chỉnh sửa chương truyện"
              : "Thêm chương mới"}
          </h1>
          <div>
            <TextInput
              id="title"
              display="Tên chương"
              value={this.state.chapter.title}
              onChanged={(k, v) => this.setFormData(k, v)}
              alert={this.state.alert.title}
            />
            <TextInput
              id="priority"
              display="Số thứ tự chương"
              value={this.state.chapter.priority}
              onChanged={(k, v) => {
                this.setFormData(k, v);
              }}
              alert={this.state.alert.priority}
            />
            <FilePicker
              multiple={true}
              mSize={5}
              onAccept={files => {
                let fileList = [];
                files.forEach((file, index) => {
                  fileList.push({
                    data: file,
                    isUploading: false,
                    isSuccess: false,
                    isError: false,
                    link: null,
                    percent: 0
                  });
                });
                this.setState({ files: fileList }, () => {
                  this.uploadFileList();
                });
              }}
            />
            <div className="links-edit-group">
              <div className="link-editor">
                {!this.state.isEditing || this.state.chapter.links ? (
                  <div className="group-input">
                    <label className="pure-material-textfield-filled">
                      <textarea
                        id="links-editor"
                        placeholder=" "
                        onChange={e => {
                          this.setFormData("links", e.target.value);
                        }}
                        value={
                          this.state.chapter.links
                            ? this.state.chapter.links
                            : ""
                        }
                      />
                      <span>Danh sách liên kết</span>
                    </label>
                    <div
                      className={
                        "field-alert " + (this.state.alert.links ? "" : "hide")
                      }
                    >
                      <p>{this.state.alert.links}</p>
                    </div>
                  </div>
                ) : (
                  <Progress display="Đang lấy dữ liệu..." />
                )}
              </div>
              {this.state.files.length !== 0 && (
                <div className="link-upload">
                  <div>
                    <span>
                      <i className="fas fa-clipboard-check clgreen" />{" "}
                      {this.state.numUploaded + "/" + this.state.files.length}
                    </span>
                    <span>
                      <i className="fas fa-exclamation-triangle clred" />{" "}
                      {this.state.numError + "/" + this.state.files.length}
                    </span>
                  </div>
                  {fl}
                  <div className="actions">
                    {this.state.files.length !== 0 && (
                      <span
                        className="copy-down"
                        onClick={() => {
                          this.filesToLinks();
                        }}
                      >
                        Sao chép xuống <i className="fas fa-level-down-alt" />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            display={this.state.isEditing ? "Cập nhật" : "Thêm chương"}
            onClick={() => {
              if (this.state.isEditing) this.onUpdateChapter();
              else this.onAddChapter();
            }}
          />
        </Modal>
        <ReactTable
          data={this.state.data}
          columns={columns}
          loading={this.state.loading}
          LoadingComponent={LoadingCmp}
          showPageSizeOptions={false}
          filterable={true}
          resizable={false}
          defaultPageSize={20}
          sortable={false}
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
              id: "SoThuTu",
              desc: true
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

const TLN = {
  eventList: {},
  update_line_numbers: function(ta, el) {
    let lines = ta.value.split("\n").length;
    let child_count = el.children.length;
    let difference = lines - child_count;

    if (difference > 0) {
      let frag = document.createDocumentFragment();
      while (difference > 0) {
        let line_number = document.createElement("span");
        line_number.className = "tln-line";
        frag.appendChild(line_number);
        difference--;
      }
      el.appendChild(frag);
    }
    while (difference < 0) {
      el.removeChild(el.firstChild);
      difference++;
    }
  },
  append_line_numbers: function(id) {
    let ta = document.getElementById(id);
    if (ta == null) {
      return null;
    }
    if (ta.className.indexOf("tln-active") != -1) {
      return null;
    }
    ta.classList.add("tln-active");
    ta.style = {};

    let el = document.createElement("div");
    ta.parentNode.insertBefore(el, ta);
    el.className = "tln-wrapper";
    TLN.update_line_numbers(ta, el);
    TLN.eventList[id] = [];

    const __change_evts = ["propertychange", "input", "keydown", "keyup"];
    const __change_hdlr = (function(ta, el) {
      return function(e) {
        if (
          (+ta.scrollLeft == 10 &&
            (e.keyCode == 37 ||
              e.which == 37 ||
              e.code == "ArrowLeft" ||
              e.key == "ArrowLeft")) ||
          e.keyCode == 36 ||
          e.which == 36 ||
          e.code == "Home" ||
          e.key == "Home" ||
          e.keyCode == 13 ||
          e.which == 13 ||
          e.code == "Enter" ||
          e.key == "Enter" ||
          e.code == "NumpadEnter"
        )
          ta.scrollLeft = 0;
        TLN.update_line_numbers(ta, el);
      };
    })(ta, el);
    for (let i = __change_evts.length - 1; i >= 0; i--) {
      ta.addEventListener(__change_evts[i], __change_hdlr);
      TLN.eventList[id].push({
        evt: __change_evts[i],
        hdlr: __change_hdlr
      });
    }

    const __scroll_evts = ["change", "mousewheel", "scroll"];
    const __scroll_hdlr = (function(ta, el) {
      return function() {
        el.scrollTop = ta.scrollTop;
      };
    })(ta, el);
    for (let i = __scroll_evts.length - 1; i >= 0; i--) {
      ta.addEventListener(__scroll_evts[i], __scroll_hdlr);
      TLN.eventList[id].push({
        evt: __scroll_evts[i],
        hdlr: __scroll_hdlr
      });
    }
  },
  remove_line_numbers: function(id) {
    let ta = document.getElementById(id);
    if (ta == null) {
      return console.warn("[tln.js] Couldn't find textarea of id '" + id + "'");
    }
    if (ta.className.indexOf("tln-active") == -1) {
      return console.warn(
        "[tln.js] textarea of id '" + id + "' isn't numbered"
      );
    }
    ta.classList.remove("tln-active");

    ta.previousSibling.remove();

    if (!TLN.eventList[id]) return;
    for (let i = TLN.eventList[id].length - 1; i >= 0; i--) {
      const evt = TLN.eventList[id][i];
      ta.removeEventListener(evt.evt, evt.hdlr);
    }
    delete TLN.eventList[id];
  }
};

const LoadingCmp = props => {
  return props.loading ? (
    <div className="loadingcmp">
      <Progress />
    </div>
  ) : (
    ""
  );
};

const CopyButton = ({ text }) => {
  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <span onClick={copyToClipboard} className="copy-btn">
      <i className="far fa-copy" />
    </span>
  );
};

const JsonStrToLinkStr = str => {
  let arr = JSON.parse(str);
  var links = "";
  for (var i = 0; i < arr.length; i++) {
    if (i !== 0) {
      links += "\n" + arr[i];
    } else {
      links += arr[i];
    }
  }
  return links;
};
