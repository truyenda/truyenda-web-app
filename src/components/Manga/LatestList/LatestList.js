import React, { Component } from 'react';
import styles from './LatestList.scss';
import TimeAgo from 'react-timeago';
import { Link } from "react-router-dom";
import { toComicLink, toChapterLink } from '../../../utils/LinkUtils';
import Photo from '../../commonUI/Photo';

export default class LatestList extends Component {
  render() {
    return (
      <div className="manga-wrapper"> 
        <div className="manga-item">
            <div className="left">
              <Link
                to={ toComicLink(this.props.title, this.props.id_truyen)}
              >
                <div className="img_div">
                  <Photo className="img" src={ this.props.image_manga } />
                </div>
              </Link>
              <Link
                to={ toComicLink(this.props.title, this.props.id_truyen)}
              >
                <div className="name_title">
                    <div>{ this.props.title }</div>
                    <div>{ this.props.cout_new_chapter }</div>
                </div>
              </Link>
            </div>
            <div className="e6dEC">
              <div className="_1nNC1"></div>
              <Link
                to={toChapterLink(
                  this.props.title,
                  this.props.new_chapter,
                  this.props.id_chuong
                )}
              >
                <div className="Mq7mR" href="#" >{ this.props.new_chapter }</div>
              </Link>
            </div>

            <div className="_2t82X"><TimeAgo date={this.props.date_update} /></div>
        </div>
      </div>
    )
  }
}
