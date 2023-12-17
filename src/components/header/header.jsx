import React from 'react';

import { Input, Tabs } from 'antd'
import { debounce } from "lodash";

function Header(props) {
  const { onRequestToMovie, onChangeTabs, getRatedFilms, requestValue } = props

  const sendRequestToApi = debounce((e) => {
    e.stopPropagation();
    e.preventDefault();
    onRequestToMovie(e.target.value)
    // this.onValueLoaded('')
  },1500);

  const tabsItems = [
    {
      key: 1,
      label: 'Search',
      children: <Input
        style={{marginLeft: 36, marginRight: 36}}
        placeholder='Enter your request'
        onChange={sendRequestToApi}
        // value={''}
      />
    },
    {
      key: 2,
      label: 'Rated'
    },
  ];

  return (
    <Tabs
          size={'middle'}
          centered={true}
          defaultActiveKey="1"
          items={tabsItems}
          onChange={onChangeTabs}
          destroyInactiveTabPane={true}
        />
  )
};

export default Header;
      