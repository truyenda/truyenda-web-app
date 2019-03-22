import React, { Component } from "react";
import "../TextInput/TextInput.scss";

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  //handle change event
  setChange(event) {
    this.setState({
      input: event.target.value
    });
    if(this.props.onChanged)
      this.props.onChanged(this.props.id, event.target.value);
  }
  //set init text
  componentWillMount() {
    if (this.props.value) {
      this.setState({
        input: this.props.value
      });
    }
  }
  render() {
    return (
      <div className="group-input">
        <label className="pure-material-textfield-filled">
          <textarea
            id={this.props.id}
            name={this.props.name}
            placeholder=" "
            type={this.props.type ? this.props.type : "text"}
            onChange={event => this.setChange(event)}
            value={this.state.input}
            autoComplete={this.props.id}
            disabled={this.props.disabled ? this.props.disabled : false}
            required={this.props.required ? this.props.required : false}
          />
          <span>{this.props.display}</span>
        </label>
        <div className={"field-alert " + (this.props.alert ? "" : "hide")}>
          <p>{this.props.alert}</p>
        </div>
      </div>
    );
  }
}

export default TextArea;
