import React, { Component } from 'react';
import './RadioButton.scss';

class RadioButton extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: ''
    };
  this.radioChange = this.radioChange.bind(this);
}

  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value
    });
  }
  
  render() {
    return (
      <label>
        
        <input type="radio"
               name= {this.props.name}
               value={this.props.value}
               checked={this.state.selectedOption === this.props.value}
               onChange={this.radioChange} />{this.props.label}
      </label> 
    );
  }
}

export default RadioButton;
