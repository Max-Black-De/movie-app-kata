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
  const { onRequestToApi } = this.props
  onRequestToApi(requestValue)
  this.onValueLoaded('')
},2000)

  render() {
    return (
      <Input
        style={{marginTop: 20}}
        placeholder='Enter your request'
        onChange={this.inputHandler}
        value={this.state.requestValue}
      />
    )
  }
};