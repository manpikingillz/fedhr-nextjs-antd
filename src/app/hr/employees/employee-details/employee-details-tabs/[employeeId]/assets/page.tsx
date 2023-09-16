'use client'

import { SettingOutlined, InsertRowLeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Divider, Typography } from 'antd';
import AssetList from './Asset';


function Assets() {

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
      label: 'Assets',
      children: <div><AssetList/></div>,
      extra: genExtra(),
    }
  ];


  return (
    <div>
      <InsertRowLeftOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Assets </Typography.Text>
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

export default Assets;
