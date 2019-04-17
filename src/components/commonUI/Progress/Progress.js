import React, { Component } from 'react';
import './Progress.scss';

class Progress extends Component {
    render() {
        return (
            <div className='progress-bar'>
                <progress className="pure-material-progress-circular" />
                {this.props.display?<p>{this.props.display}</p>:''}
            </div>
        );
    }
}

export default Progress;
