import "./Dashboard.scss";
import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Logo from "../../assets/b725a56c-207a-4c5c-af91-beb98632d3d8.png";
import ComicsDashBoard from './ComicsDashBoard';
import CategoryTable from './CategoryTable';
import AuthorTable from './AuthorTable';
import FrequencyTable from './FrequencyTable';
import StoryStatusTable from './StoryStatusTable';
import ComicDetailsTable from "./ComicDetailsTable/ComicDetailsTable";
class Dashboard extends Component {
  componentDidMount(){
    document.title = 'Trang quản lý'
  }
  render() {
    return (
      <div className="dashboard-container">
        <SideBar groups={accessFilter(routeList)} />
        <div className="board-container">
          <Switch>
            <Route path="/dashboard/comics" exact={true} component={ComicsDashBoard}/>
            <Route path="/dashboard/comics/:id" exact={true} component={ComicDetailsTable}/>
            <Route path='/dashboard/authors' exact={true} component={AuthorTable}/>
            <Route path='/dashboard/categories' exact={true} component={CategoryTable}/>
            <Route path='/dashboard/frequencies' exact={true} component={FrequencyTable}/>
            <Route path='/dashboard/status' exact={true} component={StoryStatusTable}/>
            <Route component={WelcomePanel} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;

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
        icon: "fas fa-users"
      },
      {
        name: "Truyện",
        path: "comics",
        icon: "fas fa-swatchbook"
      },
      {
        name: "Nhóm dịch",
        path: "teams",
        icon: "fas fa-users-cog"
      },
      {
        name: "Tác giả",
        path: "authors",
        icon: "fas fa-paint-brush"
      },
      {
        name: "Thể loại",
        path: "categories",
        icon: "fas fa-scroll"
      },
      {
        name: "Chu kỳ",
        path: "frequencies",
        icon: "fab fa-safari"
      },
      {
        name: "Trạng thái",
        path: "status",
        icon: "fas fa-receipt"
      }
    ]
  },
  {
    group: "Nhóm",
    route: [
      {
        name: "Nhóm của tôi",
        path: "myteam",
        icon: "fas fa-users-cog"
      },
      {
        name: "Truyện của tôi",
        path: "mycomic",
        icon: "fas fa-swatchbook"
      }
    ]
  }
];

const accessFilter = (routeList) => {
  //TODO: get user permissions and check to visible the right route
  var acceptRoutes = routeList;
  return acceptRoutes;
}

const SideBar = props => {
  const GroupTags = props.groups.map((g, i) => {
    return <GroupTag group={g} key={i} />;
  });
  return <div className="side-bar">{GroupTags}</div>;
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
