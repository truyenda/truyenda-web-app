import "./Dashboard.scss";
import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import Logo from "../../assets/b725a56c-207a-4c5c-af91-beb98632d3d8.png";
import ComicsDashBoard from "./ComicsDashBoard";
import CategoryTable from "./CategoryTable";
import AuthorTable from "./AuthorTable";
import FrequencyTable from "./FrequencyTable";
import StoryStatusTable from "./StoryStatusTable";
import ComicDetailsTable from "./ComicDetailsTable/ComicDetailsTable";
import TeamTable from "./TeamTable";
import Account from "./Account/Account";
import RoleTable from "./RoleTable";
import MyTeam from "./MyTeam";
import MyComic from "./MyComic";
import PrivateRoute from "../../components/PrivateRoute";
import { connect } from "react-redux";
class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = "Trang quản lý";
  }
  render() {
    return (
      <div className="dashboard-container">
        <SideBar groups={accessFilter(routeList, this.props.user)} />
        <div className="board-container">
          <Switch>
            <PrivateRoute
              path="/dashboard/comics"
              per="STORY_MAN STORY_ALL"
              exact={true}
              component={ComicsDashBoard}
            />
            <PrivateRoute
              path="/dashboard/comics/:id"
              exact={true}
              per="CHAPTER_MAN"
              component={ComicDetailsTable}
            />
            <PrivateRoute
              path="/dashboard/teams"
              per="TEAM_MAN TEAM_ALL"
              exact={true}
              component={TeamTable}
            />
            <PrivateRoute
              path="/dashboard/authors"
              per="AUTHOR_MAN"
              exact={true}
              component={AuthorTable}
            />
            <PrivateRoute
              path="/dashboard/categories"
              per="CATEGORY_MAN"
              exact={true}
              component={CategoryTable}
            />
            <PrivateRoute
              path="/dashboard/frequencies"
              per="FREQUENCY_MAN"
              exact={true}
              component={FrequencyTable}
            />
            <PrivateRoute
              path="/dashboard/status"
              per="SSTATUS_MAN"
              exact={true}
              component={StoryStatusTable}
            />
            <PrivateRoute
              path="/dashboard/accounts"
              per="ACCOUNT_MAN"
              exact={true}
              component={Account}
            />
            <PrivateRoute
              path="/dashboard/role"
              per="ACCOUNT_MAN"
              exact={true}
              component={RoleTable}
            />
            <PrivateRoute
              path="/dashboard/myteam"
              per="TEAM_MAN"
              exact={true}
              component={MyTeam}
            />
            <PrivateRoute
              path="/dashboard/mycomic"
              per="STORY_MAN"
              exact={true}
              component={MyComic}
            />
            <Route component={WelcomePanel} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.session.user,
  auth: state.session.authenticated
});

export default connect(
  mapState,
  null
)(Dashboard);

const WelcomePanel = () => {
  return (
    <div className="welcome-container">
      <img src={Logo} />
      <span className="welcome-label">👏 Chào mừng!</span>
      <span className="welcome-mes">Bạn đã đến trang quản lý</span>
    </div>
  );
};

const routeList = [
  {
    group: "Hệ thống",
    route: [
      {
        name: "Tài khoản",
        path: "accounts",
        icon: "fas fa-users",
        per: "ACCOUNT_MAN"
      },
      {
        name: "Vai trò",
        path: "role",
        icon: "fas fa-user-tag",
        per: "ACCOUNT_MAN"
      },
      {
        name: "Truyện",
        path: "comics",
        icon: "fas fa-swatchbook",
        per: "STORY_MAN STORY_ALL"
      },
      {
        name: "Nhóm dịch",
        path: "teams",
        icon: "fas fa-users-cog",
        per: "TEAM_MAN TEAM_ALL"
      },
      {
        name: "Tác giả",
        path: "authors",
        icon: "fas fa-paint-brush",
        per: "AUTHOR_MAN"
      },
      {
        name: "Thể loại",
        path: "categories",
        icon: "fas fa-scroll",
        per: "CATEGORY_MAN"
      },
      {
        name: "Chu kỳ",
        path: "frequencies",
        icon: "fab fa-safari",
        per: "FREQUENCY_MAN"
      },
      {
        name: "Trạng thái",
        path: "status",
        icon: "fas fa-receipt",
        per: "SSTATUS_MAN"
      }
    ]
  },
  {
    group: "Nhóm",
    route: [
      {
        name: "Nhóm của tôi",
        path: "myteam",
        icon: "fas fa-users-cog",
        per: "TEAM_MAN"
      },
      {
        name: "Truyện của tôi",
        path: "mycomic",
        icon: "fas fa-swatchbook",
        per: "STORY_MAN"
      }
    ]
  }
];

const accessFilter = (routeList, user) => {
  var acceptGroups = [];
  var userPermissions = user.Permissions.map(p => p.TenQuyen);
  for (var i = 0; i < routeList.length; i++) {
    if (user.Id_NhomDich === 1 && i === 1) continue;
    let routeGroup = routeList[i];
    let acceptRoutes = [];
    routeGroup.route.forEach(route => {
      let routePers = route.per.split(" ");
      let isAccept = true;
      for (let j = 0; j < routePers.length; j++) {
        if (!userPermissions.includes(routePers[j])) {
          isAccept = false;
          break;
        }
      }
      if (isAccept) {
        acceptRoutes.push(route);
      }
    });
    if (acceptRoutes.length !== 0)
      acceptGroups.push({ group: routeGroup.group, route: acceptRoutes });
  }
  return acceptGroups;
};

const SideBar = props => {
  const GroupTags = props.groups.map((g, i) => {
    return <GroupTag group={g} key={i} />;
  });
  if (GroupTags.length !== 0)
    return <div className="side-bar">{GroupTags}</div>;
  else return <Redirect to="/" />;
};

const GroupTag = props => {
  const routeList = props.group.route.map((r, i) => {
    return (
      <Link to={"/dashboard/" + r.path} key={i}>
        <li
          className={
            window.location.href.split("/")[4] === r.path ? "selected" : ""
          }
        >
          <i className={r.icon} />
          <span>{r.name}</span>
        </li>
      </Link>
    );
  });
  return (
    <ul>
      <span className="header-side">{props.group.group}</span>
      {routeList}
    </ul>
  );
};
