import React, { Component } from 'react';
import './Button.scss';

class Button extends Component {
    //handle click event by parent callback
  clicked() {
    if(this.props.onClick)
      this.props.onClick();
  }
  render() {
    return (
      <div>
        <button
          type={this.props.submit}
          onClick={() => this.clicked()}
          className={'button ' + (this.props.type ? this.props.type : 'btn-ok')}
          disabled={this.props.disabled?this.props.disabled:false}
        >
          {this.props.display}
        </button>
      </div>
    );
  }
}

export default Button;
