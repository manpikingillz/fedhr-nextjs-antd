'use client'

import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Divider, Typography } from 'antd';
import EmergencyContactList from './EmergencyContact';


function Emergency() {

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
      label: 'Emergency',
      children: <div><EmergencyContactList/></div>,
      extra: genExtra(),
    }
  ];


  return (
    <div>
      <UserOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Emergency Contacts </Typography.Text>
      <Divider className='mt-2'/>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition="start"
        items={items}
      />
    </div>
  );
};

export default Emergency;
