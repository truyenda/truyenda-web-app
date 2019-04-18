import React, { Component } from 'react';
import styles from './AllManga.scss';
import AllMangaCom from '../../components/AllMangaCom';

export default class AllManga extends Component {
  render() {
    return (
      <div className="all-manga-container">
        <AllMangaCom />
      </div>
    )
  }
}
