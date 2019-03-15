import React, { Component } from 'react';
import styles from './Button.scss';

class Button extends Component {
    //handle click event by parent callback
  clicked() {
      this.props.onClick();
      
  }
  render() {
    return (
      <div>
            <button onClick={() => this.clicked()} className={'button btn-ok ' + this.props.type}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;
