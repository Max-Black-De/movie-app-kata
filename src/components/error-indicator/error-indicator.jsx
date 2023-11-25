import React, { Component } from "react"

import { Result } from "antd";

export default class ErrorIndicator extends Component {

  render() {
    const { status } = this.props
    const subtitle = status === '200'
      ? 'Nothing was found for your request, please repeat your request with different parameters.'
      : 'Something went wrong, please repeat your request later.';
    const resultStatus = status === '200' ? '404' : '500'

    return(
      <Result
        status={resultStatus}
        title='Sorry'
        subTitle={subtitle}
      />
    )
  }
};