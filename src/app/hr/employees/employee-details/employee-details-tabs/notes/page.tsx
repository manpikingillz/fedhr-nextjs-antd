'use client'

import { SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Card, Col, Collapse, Divider, Popconfirm, Row, Image } from 'antd';


function Notes() {

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
      label: 'Notes',
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

export default Notes;
