import React, { Component } from 'react';
import './Progress.scss';

class Progress extends Component {
    render() {
        return (
            <div className='progress-bar'>
                <progress class="pure-material-progress-circular" />
                <p>Đang tải...</p>
            </div>
        );
    }
}

export default Progress;
