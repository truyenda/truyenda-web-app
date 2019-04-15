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
      rdoStatus: 1,
      rdoRank: 1,
      genres: []
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
    this.setState({
      isBlocking: target.value.length > 0,
      [name]: value
    });
  }

  onSetState(){
    this.setState({
      shouldHide: !this.state.shouldHide
    });
  }

  onSubmitFilter(){
    console.log(this.state);
  }

  setStateForm(key, value) {
    this.setState({
      [key]: value
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
                  data={[[1, "Rank"], [2, "Name"], [3, "Date"]]}
                  style="gender-select"
                  onChanged={(key, value) => this.setStateForm(key, value)}
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

          <div className="_1FRgo"><h3>Rank</h3></div>

          <div className="MAB_t">
            <div className="md-radio md-radio-inline">
              <input value="1" id={6} type="radio" name="rdoRank"
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.rdoRank) === 1}
              />
              <label htmlFor={6}>All</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="2" id={7} type="radio" name="rdoRank" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.rdoRank) === 2}
              />
              <label htmlFor={7}>1 - 999</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="3" id={8} type="radio" name="rdoRank" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.rdoRank) === 3}
              />
              <label htmlFor={8}>1k - 2k</label>
            </div>
            <div className="md-radio md-radio-inline">
              <input value="4" id={9} type="radio" name="rdoRank" 
                onChange={() => this.isInputChangeStatus()}
                checked={parseInt(this.state.rdoRank) === 4}
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
              <Button style="btn-Gray" display="Reset" />
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
