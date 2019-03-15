import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import Button from ".././components/commonUI/Button";
import Progress from ".././components/commonUI/Progress";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }
  onClick(){
    console.log("clicked");
      
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button type='btn-cancel' onClick={this.onClick}>Đăng nhập</Button>
          <Progress></Progress>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
