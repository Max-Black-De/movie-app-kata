import React, { Component } from "react"

import { Result } from "antd";

export default class ErrorIndicator extends Component {

  render() {
    const { status, title, subtitle} = this.props
    return(
      <Result
        status={status}
        title={title}
        subTitle={subtitle}
      />
    )
  }

};