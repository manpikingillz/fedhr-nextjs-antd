'use client'

import { SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';


function Benefits() {

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Benefits Overview',
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: '1',
      label: 'Dependants',
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: '1',
      label: 'Benefits History',
      children: <div>Test</div>,
      extra: genExtra(),
    }
  ];


  return (
    <div>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition="end"
        items={items}
      />
    </div>
  );
};

export default Benefits;