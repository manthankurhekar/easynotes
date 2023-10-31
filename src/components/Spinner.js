import React, { Component } from 'react'
import loading from '../book_loading_spinner.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
            <img src={loading} alt="loading" style={{height: '100px', margin: '100px'}}></img>
      </div>
    )
  }
}

