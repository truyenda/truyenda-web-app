import React, { Component } from "react";
import logo from "../assets/logo.svg";
import "./App.scss";
import Button from "../components/commonUI/Button";
import Progress from "../components/commonUI/Progress";
import TextInput from "../components/commonUI/TextInput";
import TextArea from "../components/commonUI/TextArea";
import CheckBox from '../components/commonUI/CheckBox';
import SelectBox from '../components/commonUI/SelectBox';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "hello",
      remember: false,
      selectbox: 1
    };
  }
  onClick() {
    console.log(this.state);
    console.log("clicked");
  }
  setStateForm(key, value) {
    let fields = this.state;
    fields[key] = value;
    this.setState(fields);
    console.log(this.state);
  }

  componentWillReceiveProps() {}
  render() {
    var data = [[0, 'hello'],[1,'konichiwa']]
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <TextInput
              display="Tài khoản"
              id="username"
              onChanged={(key, value) => this.setStateForm(key, value)}
              value={this.state.username}
              // type='password'
              required={true}
              // disabled={true}
              // alert="You can not leave empty"
            />
            <TextInput
              display="Mật khẩu"
              id="password"
              onChanged={(key, value) => this.setStateForm(key, value)}
              // value={this.state.username}
              type="password"
              required={true}
              // disabled={true}
              // alert="You can not leave empty"
            />
            <CheckBox
              id="remember"
              display="Remember me"
              checked={this.state.remember}
              disabled={false}
              onChanged={(key, value) => this.setStateForm(key, value)}
            />
            <SelectBox
              id="selectbox"
              display="Thể loại"
              data={data}
              selected={this.state.selectbox}
              // disabled={true}
              onChanged={(key, value) => this.setStateForm(key, value)}
            />
            <Button
              type="btn-ok"
              submit="submit"
              display="Submit"
              disabled={false}
              onClick={() => this.onClick()}
            />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
