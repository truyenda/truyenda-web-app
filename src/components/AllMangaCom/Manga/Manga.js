import React, { Component } from "react";
import styles from "./Manga.scss";
export default class Manga extends Component {
	render() {
		return (
			<div className="_2JUQV">
        <img src={this.props.anhbia} className="_1iAGN"></img>
        <div className="_10RzI">
          <a className="vlQGQ">{this.props.ten}</a>
        </div>
        <div className="_2KzkR">
          <a className="_3Qy_B">{this.props.tacgia}</a>
        </div>
        <div className="_3UsUq">{this.props.trangthai}</div>
      </div>
		);
	}
}
