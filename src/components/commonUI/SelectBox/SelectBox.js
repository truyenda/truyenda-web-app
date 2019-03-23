import React, { Component } from "react";
import "./SelectBox.scss";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1
    };
  }
  setChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChanged)
      this.props.onChanged(this.props.id, event.target.value);
  }
  componentWillMount() {
    //receive selected item
    if (this.props.selected) {
      this.setState({
        value: this.props.selected
      });
    } else {
      // select first option by defautl
      if (this.props.data.length != 0) {
        this.setState({
          value: this.props.data[0][0]
        });
        this.props.onChanged(this.props.id, this.props.data[0][0]);
      }
    }
  }
  render() {
    return (
      <div className={"select " + (this.props.style ? this.props.style : "")}>
        <select
          className="select-text"
          value={this.state.value}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={e => this.setChange(e)}
        >
          {this.props.data.map(d => {
            return (
              <option value={d[0]} key={this.props.id + d[0]}>
                {d[1]}
              </option>
            );
          })}
        </select>
        <span className="select-highlight" />
        <span className="select-bar" />
        <label className="select-label">
          {this.props.icon ? <i className={this.props.icon} /> : ""}
          {" " + this.props.display}
        </label>
      </div>
    );
  }
}

export default SelectBox;
