import React, { Component } from "react";
import "./CheckBox.scss";

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  setChange(event) {
    this.setState({
      checked: event.target.checked
    });
    this.props.onChanged(this.props.id, event.target.checked);
  }
  componentWillMount() {
    if (this.props.checked) {
      this.setState({
        checked: this.props.checked
      });
    }
  }
  render() {
    return (
      <label className="pure-material-checkbox">
        <input
            id={this.props.id}
            name={this.props.name}
            type="checkbox"
            onChange={e => this.setChange(e)}
            checked={this.state.checked ? true : false}
            disabled={this.props.disabled ? this.props.disabled : false}
        />
        <span>{this.props.display}</span>
      </label>
    );
  }
}

export default CheckBox;
