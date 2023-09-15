'use client'

import { SettingOutlined, CaretRightOutlined } from '@ant-design/icons';
import React, { CSSProperties, useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import EmploymentStatusList from './employment-status/EmploymentStatus';
import JobInformationList from './job-information/JobInformation';
import CompensationList from './compensation/Compensation';
import DirectReports from './direct-reports/DirectReports';


const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: <b>Employment Status</b>,
    children: <div><EmploymentStatusList/></div>,
    style: panelStyle,
    // extra: genExtra()
  },
  {
    key: '2',
    label: <b>Job Information</b>,
    children: <div><JobInformationList/></div>,
    // extra: genExtra(),
    style: panelStyle,
  },
  {
    key: '3',
    label: <b>Compensation</b>,
    children: <div><CompensationList/></div>,
    // extra: genExtra(),
    style: panelStyle,
  },
  {
    key: '4',
    label: <b>Direct Reports</b>,
    children: <div> <DirectReports/></div>,
    // extra: genExtra(),
    style: panelStyle,
  },
];

function EmploymentInformation() {
  const { token } = theme.useToken();


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

  const panelStyle: React.CSSProperties = {
    // marginBottom: 24,
    // background: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: 'none',
  };

  return (
    <div>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition="start"
        items={getItems(panelStyle)}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        bordered={false}
      />

    </div>
  );
};

export default EmploymentInformation;
