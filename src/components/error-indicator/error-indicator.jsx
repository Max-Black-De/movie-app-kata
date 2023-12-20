import React from "react"
import { PropTypes } from 'prop-types'
import { Result } from "antd";

function ErrorIndicator(props) {


  const { status } = props
  const subtitle = status === '200'
    ? 'Nothing was found for your request, please repeat your request with different parameters.'
    : 'Something went wrong, please repeat your request later.';
  const resultStatus = status === '200' ? '404' : '500'

  return (
    <Result
      status={resultStatus}
      title='Sorry'
      subTitle={subtitle}
    />
  )

}

ErrorIndicator.propTypes = {
  status: PropTypes.string.isRequired
}

export default ErrorIndicator