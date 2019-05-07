import React, { Component } from 'react';
import styles from './LatestList.scss';
import TimeAgo from 'react-timeago'
import demo from "../../../assets/demo.jpg";

export default class LatestList extends Component {
  render() {
    return (
      <div className="manga-wrapper"> 
        <div className="manga-item">
            <div className="left">
              <div className="img_div">
                <img className="img" src={demo} />
              </div>
              <div className="name_title">
                  <a>{ this.props.title }</a>
                  <div>{ this.props.cout_new_chapter }</div>
              </div>
            </div>
            <div className="e6dEC">
              <div className="_1nNC1"></div>
              <a className="Mq7mR" href="#" >{ this.props.new_chapter }</a>
            </div>

            <div className="_2t82X"><TimeAgo date={this.props.date_update} /></div>
        </div>
      </div>
    )
  }
}
