import "./TeamProfile.scss";
import React, { Component } from "react";
import TeamApi from "../../api/TeamApi";
import Progress from "../../components/commonUI/Progress";
import Photo from "../../components/commonUI/Photo";
import NotFound from "../Error/NotFound";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { toComicLink } from "../../utils/LinkUtils";
import Button from "../../components/commonUI/Button";
class TeamProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      data: null,
      isError: false,
      isError404: false,
      page: 0,
      totalPages: 1,
      loading: false,
      loadfulled: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    try {
      var uri = document.location.href;
      var Id = uri.split("teams/")[1].split("-")[0];
      if (!isNaN(Id)) {
        TeamApi.get(Id)
          .then(res => {
            this.setState({
              team: res.data.Data
            });
            document.title = "Nhóm " + res.data.Data.TenNhomDich;
            this.getTeamStory(Id, 1);
          })
          .catch(err => {
            this.setState({
              isError: true
            });
          });
      }
    } catch (err) {
      this.setState({ isError404: true });
    }
  }

  getTeamStory(Id, index) {
    this.setState({
      loading: true
    });
    TeamApi.getComicList(Id, index)
      .then(res => {
        var curpage = res.data.Data.Paging.CurrentPage;
        var topage = res.data.Data.Paging.TotalPages;
        if (this.state.page < curpage) {
          let data = this.state.data ? this.state.data : [];
          data = data.concat(res.data.Data.listTruyen);
          this.setState({
            data: data,
            page: res.data.Data.Paging.CurrentPage,
            totalPages: res.data.Data.Paging.TotalPages,
            loadfulled:
              res.data.Data.Paging.CurrentPage ===
              res.data.Data.Paging.TotalPages
                ? true
                : false
          });
        }
      })
      .catch(err => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  loadMore() {
    if (this.state.page < this.state.totalPages) {
      this.getTeamStory(this.state.team.Id, this.state.page + 1);
    }
  }

  render() {
    if (this.state.isError404) {
      return <NotFound />;
    }
    if (this.state.isError) {
      return <span>Có lỗi xảy ra trong quá trình kết nối</span>;
    }
    var List = null;
    if (this.state.data) {
      List = this.state.data.map((story, index) => {
        return (
          <div
            key={index}
            className="story-thumb-container"
            data-for={"thumb-tip" + index}
            data-tip={story}
          >
            <Link to={toComicLink(story.TenTruyen, story.Id)} className="link">
              <Photo src={story.AnhDaiDien} className="thumb" />
              <span>{story.TenTruyen}</span>
            </Link>
            <ReactTooltip
              multiline={true}
              id={"thumb-tip" + index}
              effect="solid"
              getContent={v => (
                <div className="tip-200">
                  <b>{story.TenTruyen}</b>
                  <p>Nội dung: {story.MoTa ? story.MoTa : "Chưa có"}</p>
                </div>
              )}
            />
          </div>
        );
      });
    }
    return (
      <div className="team-profile">
        {!this.state.team && <Progress display="Đang tải dữ liệu" />}
        {this.state.team && (
          <div className="team-info">
            <Photo src={this.state.team.Logo} className="logo-team" />
            <div className="team-name">
              <span>
                <b>Nhóm</b> {this.state.team.TenNhomDich}
              </span>
              <p>{this.state.team.MoTa}</p>
            </div>
          </div>
        )}
        {this.state.team && (
          <div className="team-comic-container">
            <span>Truyện của nhóm</span>
          </div>
        )}
        {this.state.team && !this.state.data && (
          <Progress display="Đang lấy danh sách truyện" />
        )}
        {
          this.state.team && this.state.data && this.state.data.length === 0 && <div className='empty-notify'>Chưa có truyện nào</div>
        }
        {this.state.data && <div className="list-story">{List}</div>}
        {this.state.page < this.state.totalPages && (
          <div className="loadmore-container">
            {this.state.loading && <Progress />}
            <Button
              icon="fas fa-level-down-alt"
              display=" Xem thêm"
              onClick={() => {
                this.loadMore();
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TeamProfile;
