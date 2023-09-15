'use client'

import { SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Divider, Typography } from 'antd';


function Training() {

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
      label: 'Upcoming Training',
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'Completed',
      children: <div>Test</div>,
      extra: genExtra(),
    }
  ];


  return (
    <div>
      <SolutionOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Training </Typography.Text>
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

export default Training;
