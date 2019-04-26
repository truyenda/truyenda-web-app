import React, { Component } from 'react';
import styles from './Manga.scss';
import LatestList from './LatestList';
import LatestFilter from './LatestFilter';
import Button from '../commonUI/Button';


export default class Manga extends Component {
  constructor(props) {
    super(props);
    this.state = {
       mangas: [
        {
          id : 1,
          title: "Truyen trinh tham",
          count_new_chapter: "2 new chapter",
          new_chapter: "Chapter 4",
          date_update: "2 hour ago"
        },
        {
          id : 2,
          title: "Truyen tham tu",
          count_new_chapter: "3 new chapter",
          new_chapter: "Chapter 2",
          date_update: "4 hour ago"
        },
        {
          id : 3,
          title: "Truyen ngon tham",
          count_new_chapter: "5 new chapter",
          new_chapter: "Chapter 3",
          date_update: "3 hour ago"
        }
      ]
    };
  }
  render() {
    var elements_mangas = this.state.mangas.map((manga, index) => {
      return  <div key={ manga.id } className="alternative_cls">
                <LatestList
                  title={ manga.title }
                  count_new_chapter={ manga.count_new_chapter }
                  new_chapter={ manga.new_chapter }
                  date_update={ manga.date_update }
                />
              </div>

    });
    return (
      <div className="main-wrappers">
        <h1 className="_3kDZW">Latest Update</h1>
        <LatestFilter />
        <div className="_3_XVY"><h4>521 manga</h4></div>
        <div className="_3X8sC">
          <div className="qjYVyl">Manga</div>
          <div className="qjYVym">New chapters</div>
          <div className="qjYVyr">Date updated</div>
        </div>
        { elements_mangas }
      </div>
    )
  }
}
