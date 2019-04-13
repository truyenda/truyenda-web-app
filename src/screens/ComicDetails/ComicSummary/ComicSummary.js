import React, { Component } from 'react'
import styles from './ComicSummary.scss';

export default class ComicSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comic: this.props.details
    }
  }

  render() {
    const {comic} = this.state;
    return (
      <div className="comic-summary-container">
         <h2>Summary</h2>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, laboriosam doloribus facilis reiciendis perferendis debitis quos aspernatur, alias est recusandae, necessitatibus earum quaerat enim assumenda praesentium quae blanditiis velit quasi.</p>
      </div>
    )
  }
}
