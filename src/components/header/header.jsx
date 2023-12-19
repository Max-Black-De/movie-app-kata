import React, { Component } from 'react';

import { Input, Tabs } from 'antd';
import { debounce } from "lodash";
import { PropTypes } from 'prop-types'

import './header.css'

export default class Header extends Component {
  state = {
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
  }, 1000)

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
  render() {
    const { tabsKey } = this.props
    return (
      <>
        <Tabs
          size={'middle'}
          centered={true}
          defaultActiveKey="1"
          items={this.tabsItems}
          onChange={this.props.onChangeTabs}
          destroyInactiveTabPane={true}
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
};
Header.propDefault = {
  currentStatus: true,
}

Header.propType = {
  tabsKey: PropTypes.boolean,
  onRequestToMovie: PropTypes.func.isRequired
}

