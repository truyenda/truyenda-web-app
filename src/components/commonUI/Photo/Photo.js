import React, { Component } from "react";
import "./Photo.scss";
import Progress from "../Progress";
class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  loaded() {
    this.setState({ loading: false });
  }
  render() {
    return (
      <div className={"loadimg " + this.props.className}>
        <img
          id="load-img"
          onLoad={() => this.loaded()}
          onError={() => this.loaded()}
          src={this.props.src}
        />
        {this.state.loading && (
          <div className="loadingcmp">
            <Progress />
          </div>
        )}
      </div>
    );
  }
}

export default Photo;
