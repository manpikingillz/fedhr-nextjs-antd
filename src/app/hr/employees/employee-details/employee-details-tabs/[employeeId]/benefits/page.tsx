'use client'

import { SettingOutlined, ContainerOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Divider, Typography } from 'antd';


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
      <ContainerOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Benefits </Typography.Text>
      <Divider className='mt-2'/>
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
