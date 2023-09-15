'use client'

import { SettingOutlined, SnippetsOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Divider, Typography } from 'antd';


function Documents() {

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
      label: 'Documents',
      children: <div>Test</div>,
      extra: genExtra(),
    }
  ];


  return (
    <div>
      <SnippetsOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Time Off </Typography.Text>
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

export default Documents;
