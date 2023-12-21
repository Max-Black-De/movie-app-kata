import React, { Component } from 'react';

import { Input, Tabs } from 'antd';
import { debounce } from "lodash";
import { PropTypes } from 'prop-types'

import './header.css'

export default class Header extends Component {

  state = {
    requestValue: ''
  }

  tabsItems = [
    {
      key: 1,
      label: 'Search',
    },
    {
      key: 2,
      label: 'Rated'
    },
  ];

  sendRequestToApi = debounce(() => {
    const { requestValue } = this.state
    const { onRequestToMovie } = this.props
    onRequestToMovie(requestValue)
    this.onValueLoaded('')
  }, 1000)

  onValueLoaded = (requestValue) => {
    this.setState({
      requestValue
    })
  };

  inputHandler = (e) => {
    const { value } = e.target
    this.onValueLoaded(value)
    this.sendRequestToApi()
  };

  render() {
    const { tabsKey, onChangeTabs } = this.props
    return (
      <>
        <Tabs
          size="middle"
          centered
          defaultActiveKey="1"
          items={this.tabsItems}
          onChange={onChangeTabs}
          destroyInactiveTabPane
        />
        {
          tabsKey
            ? <Input
              className='movies-input'
              placeholder='Enter your request'
              onChange={this.inputHandler}
              value={this.state.requestValue}
            />
            : null
        }
      </>
    )
  }
}

Header.propDefault = {
  tabsKey: true,
}

Header.propTypes = {
  tabsKey: PropTypes.bool,
  onRequestToMovie: PropTypes.func.isRequired,
  onChangeTabs: PropTypes.func.isRequired
}

