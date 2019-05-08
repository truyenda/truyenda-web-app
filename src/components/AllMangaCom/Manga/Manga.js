import React, { Component } from "react";
import styles from "./Manga.scss";
import { Link } from "react-router-dom";
import { toComicLink } from "../../../utils/LinkUtils";
import Photo from "../../commonUI/Photo";
export default class Manga extends Component {
	render() {
		return (
			<div className="_2JUQV">
        <Link
          to={ toComicLink(this.props.ten, this.props.id_truyen)}
        >
          <Photo src={this.props.anhbia} className="_1iAGN"></Photo>
          <div className="_10RzI">
            <div className="vlQGQ">{this.props.ten}</div>
          </div>
        </Link>
        <div className="_2KzkR">
          <div className="_3Qy_B">{this.props.tacgia}</div>
        </div>
        <div className="_3UsUq">{this.props.trangthai}</div>
      </div>
		);
	}
}
