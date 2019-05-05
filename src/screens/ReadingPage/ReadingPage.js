import React, { Component } from "react";
import styles from "./ReadingPage.scss";
import ComicAuthors from "../ComicDetails/ComicAuthors/ComicAuthors";
import { getIdBySplitingPath, toChapterLink } from "../../utils/LinkUtils";
import ComicApi from "../../api/ComicApi";
import NotFound from "../Error/NotFound";
import ChapterApi from "../../api/ChapterApi";
import Progress from "../../components/commonUI/Progress";
import { Waypoint } from "react-waypoint";
import LocalBookmarkApi from "../../api/LocalBookmarkApi";
export default class ReadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: null,
      isError: false,
      isError404: false,
      isGetDone: false
    };
  }

  componentDidMount() {
    try {
      var url = document.location.href;
      var id = getIdBySplitingPath(url, "chapters/");
      if (!isNaN(id)) {
        ChapterApi.get(id)
          .then(res => {
            let data = res.data.Data;
            data.LinkAnh = JSON.parse(data.LinkAnh);
            this.setState(
              {
                chapter: data
              },
              () => setTimeout(() => this.getLocalBookmark(), 1000)
            );
            document.title = data.TenTruyen + " - " + data.TenChuong;
          })
          .catch(err => {
            this.setState({
              isError: true
            });
          });
      }
    } catch (err) {
      this.setState({
        isError404: true
      });
    }
  }

  getLocalBookmark() {
    let index = LocalBookmarkApi.get(this.state.chapter.Id);
    if (index !== 0) {
      let page = document.getElementById("image" + index);
      page.scrollIntoView();
    }
    this.setState({ isGetDone: true });
  }

  saveLocalBookmark(index) {
    if (this.state.isGetDone) {
      if (index === 0 || this.state.chapter.LinkAnh.length - 1 === index)
        LocalBookmarkApi.remove(this.state.chapter.Id);
      else {
        LocalBookmarkApi.save(this.state.chapter.Id, index);
      }
    }
  }

  render() {
    const { chapter, isError, isError404 } = this.state;
    if (isError404) {
      return <NotFound />;
    }
    if (isError) {
      return <span>Có lỗi xảy ra trong quá trình kết nối</span>;
    }
    return (
      <div className="reading-page-container">
        {chapter && (
          <div className="reading-page">
            <p>Chapter {chapter.Id}</p>
            {chapter.LinkAnh.map((c, i) => (
              <Waypoint key={i} onEnter={v => this.saveLocalBookmark(i)}>
                <img
                  id={"image" + i}
                  src={c}
                  alt={this.state.chapter.TenTruyen + " trang + " + (i + 1)}
                />
              </Waypoint>
            ))}
          </div>
        )}
        {!chapter && <div className="comic-details">Nothing to show</div>}
      </div>
    );
  }
}
