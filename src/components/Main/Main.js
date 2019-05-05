import React, { Component } from 'react'
import styles from './Main.scss';
import { Link } from "react-router-dom";

export default class Main extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className="few-hours">In the last few hours</div>
        <div>
          <div className="tilte-trending">Trending Updates</div>
          <div className="view-all">
            <Link to="/latest-update">View all</Link>
          </div>
        </div>
      </div>
    )
  }
}
