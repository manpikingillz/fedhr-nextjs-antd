'use client'

import { SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';


function EmploymentInformation() {

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
      label: 'Employment Status',
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'Job Information',
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: '3',
      label: 'Compensation',
      children: <div>Test</div>,
      extra: genExtra(),
    },
    {
      key: '4',
      label: 'Manager & Direct Reports',
      children: <div>Test</div>,
      extra: genExtra(),
    },
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

export default EmploymentInformation;
