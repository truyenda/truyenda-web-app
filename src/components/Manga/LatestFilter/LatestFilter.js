import React, { Component } from 'react';
import styles from './LatestFilter.scss';
import Button from '../../commonUI/Button';
import CheckBox from '../../commonUI/CheckBox';
import SelectBox from '../../commonUI/SelectBox';
import Caller from '../../../utils/APICaller';

export default class LatestFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldHide: true,
      genres: [],
      filter: {
        rdoStatus: "0",
        rdoRank: "0",
        sortBy: "0",
        selectedGenresIds:[]
      }
    };
  }

  componentDidMount(){
    Caller('categories').then(res => {
      this.setState({
        genres : res.data.Data
      });
    });
  }
  
  isInputChangeStatus(){
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let filter = this.state.filter;
    filter[name] = value;
    this.setState({
      isBlocking: target.value.length > 0,
      filter
    });
  }

  onSetState(){
    this.setState({
      shouldHide: !this.state.shouldHide
    });
  }

  onSubmitFilter(){
    // console.log(this.state.filter);
    this.props.onSubmit(this.state.filter);
  }

  onCloseFilter(){
    this.setState({
      shouldHide: true
    });
  }

  setStateForm(key, value) {
    let { selectedGenresIds } = this.state.filter;
    if(value == true){
      selectedGenresIds.push(key);
      this.setState({
        selectedGenresIds
      })
    }
    if(value == false){
      selectedGenresIds.pop(key);
      this.setState({
        selectedGenresIds
      })
    }
  }

  setStateFormSelect(key, value) {
    let sort = this.state.filter;
    sort[key] = value
    this.setState({
      sort
    });
  }

  render() {
    var elements_genres = this.state.genres.map((genre, index) => {
      return  <div key={ genre.Id } className="_2xJWS">
                <CheckBox
                  display={genre.TenLoaiTruyen}
                  id={genre.Id}
                  onChanged={(key, value) => this.setStateForm(key, value)}
                />
              </div>
    });
    return (
      <div className="_NkL3">
        <div className="_3XT4L">
          <Button style="btn-Brown" display="Filter" onClick={() => {this.onSetState()}} />
          <div className="vLjsF">
            <div className="_fds58">
              <label className="_2CJN8">Sort by</label>
              <div className="_7IRq2">
                <SelectBox
                  id="sortBy"
                  display=""
                  data={[["0", "Date"], ["1", "Name"], ["2", "Rank"]]}
                  style="gender-select"
                  onChanged={(key, value) => this.setStateFormSelect(key, value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.shouldHide ? 'hidden' : '_5DSAE'}>
          <div className="RCollapse">
            <div className="_1FRgo"><h3>Status</h3></div>
          </div>

          <div className="MAB_t">
            <div className="md-radio md-radio-inline">
              <input value="0" id={3} type="radio" name="rdoStatus"
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoStatus) == 0}
              />
              <label htmlFor={3}>All</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="1" id={4} type="radio" name="rdoStatus" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoStatus) == 1}
              />
              <label htmlFor={4}>Completed</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="2" id={5} type="radio" name="rdoStatus" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoStatus) == 2}
              />
              <label htmlFor={5}>Ongoing</label>
            </div>
          </div>

          <div className="_1FRgo"><h3>Rank</h3></div>

          <div className="MAB_t">
            <div className="md-radio md-radio-inline">
              <input value="0" id={6} type="radio" name="rdoRank"
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoRank) == 0}
              />
              <label htmlFor={6}>All</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="1" id={7} type="radio" name="rdoRank" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoRank) == 1}
              />
              <label htmlFor={7}>1 - 999</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="2" id={8} type="radio" name="rdoRank" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoRank) == 2}
              />
              <label htmlFor={8}>1k - 2k</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="3" id={9} type="radio" name="rdoRank" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.filter.rdoRank) == 3}
              />
              <label htmlFor={9}>2k - 3k</label>
            </div>
          </div>
  
          <div className="_1FRgo"><h3>Genres</h3></div>

          <div className="_2DMqI">
            {elements_genres}
          </div>

          <div className="_1P9WC">
            <span className="_25DCE">
              <Button style="btn-Gray" display="Close" onClick={() => {this.onCloseFilter()}} />
            </span>
            <span className="_25DCE">
              <Button style="btn-Blue" display="Apply" onClick={() => {this.onSubmitFilter()}} />
            </span>
          </div>
        </div>
      </div>
    )
  }
}
