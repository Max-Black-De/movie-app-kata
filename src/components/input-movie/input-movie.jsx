import React, { Component } from 'react';

import { Input } from 'antd'
import { debounce } from "lodash";

export default class InputMovieApp extends Component {

  state={
    requestValue: ''
  }

  inputHandler = (e) => {
    let { value } = e.target
    this.onValueLoaded(value)
    this.sendRequestToApi()
  };

  onValueLoaded = (requestValue) => {
    this.setState({
      requestValue
    })
  };

  sendRequestToApi = debounce(() => {
    const { requestValue } = this.state
    const { onRequestToMovie } = this.props
    onRequestToMovie(requestValue)
    this.onValueLoaded('')
  },2000)

  render() {
    return (
      <Input
        style={{marginLeft: 36, marginRight: 36, width: '92.87%'}}
        placeholder='Enter your request'
        onChange={this.inputHandler}
        value={this.state.requestValue}
      />
    )
  }
};