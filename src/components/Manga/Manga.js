import React, { Component } from 'react';
import styles from './Manga.scss';
import demo from "../../assets/demo.jpg";
import List_Latest from './List_Latest';
import Button from '../commonUI/Button';
import RadioButton from '../commonUI/RadioButton';


export default class Main extends Component {
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
      ],
      isActive: true,
      rdoStatus: 1
    };
  }

  isInputChangeStatus(){
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      isBlocking: target.value.length > 0,
      [name]: value
    });
  }

  onSetState(){
    this.setState({
      isActive: !this.state.isActive
    });
    // alert(this.state.isActive ? "true" : "false");
    var content = "";
    content += "Status: " + this.state.rdoStatus;
    console.log(content);
  }
  render() {
    var elements_mangas = this.state.mangas.map((manga, index) => {
      return  <div key={ manga.id } className="alternative_cls">
                <List_Latest
                  title={ manga.title }
                  count_new_chapter={ manga.count_new_chapter }
                  new_chapter={ manga.new_chapter }
                  date_update={ manga.date_update }
                />
              </div>

    });
    return (
      <div className="main-wrapper">
              <h1 className="_3kDZW">Latest Update</h1>
              <div className="_NkL3">
                <div><Button style="btn-Brown" display="Filter" onClick={() => {this.onSetState()}} /></div>
                <div><span>Status</span></div>

                <div>
                  <div className="md-radio md-radio-inline">
                    <input value="1" id={3} type="radio" name="rdoStatus"
                      onChange={() => this.isInputChangeStatus()}
                      checked={parseInt(this.state.rdoStatus) === 1}
                    />
                    <label htmlFor={3}>All</label>
                  </div>
                  <div className="md-radio md-radio-inline">
                    <input value="2" id={4} type="radio" name="rdoStatus" 
                      onChange={() => this.isInputChangeStatus()}
                      checked={parseInt(this.state.rdoStatus) === 2}
                    />
                    <label htmlFor={4}>Completed</label>
                  </div>
                  <div className="md-radio md-radio-inline">
                    <input value="3" id={5} type="radio" name="rdoStatus" 
                      onChange={() => this.isInputChangeStatus()}
                      checked={parseInt(this.state.rdoStatus) === 3}
                    />
                    <label htmlFor={5}>Ongoing</label>
                  </div>
                </div>

              </div>
              { elements_mangas }
      </div>
    )
  }
}
