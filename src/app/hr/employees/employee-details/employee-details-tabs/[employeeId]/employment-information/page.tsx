'use client';

import {
  SettingOutlined,
  CaretRightOutlined,
  ContactsTwoTone,
  CloseCircleOutlined,
} from '@ant-design/icons';
import React, { CSSProperties, useState } from 'react';
import type { CollapseProps } from 'antd';
import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Typography,
  theme,
} from 'antd';
import EmploymentStatusList from './employment-status/EmploymentStatus';
import JobInformationList from './job-information/JobInformation';
import CompensationList from './compensation/Compensation';
import DirectReports from './direct-reports/DirectReports';

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  panelStyle
) => [
  {
    key: '1',
    label: <b>Employment Status</b>,
    children: (
      <div>
        <EmploymentStatusList />
      </div>
    ),
    style: panelStyle,
    // extra: genExtra()
  },
  {
    key: '2',
    label: <b>Job Information</b>,
    children: (
      <div>
        <JobInformationList />
      </div>
    ),
    // extra: genExtra(),
    style: panelStyle,
  },
  {
    key: '3',
    label: <b>Compensation</b>,
    children: (
      <div>
        <CompensationList />
      </div>
    ),
    // extra: genExtra(),
    style: panelStyle,
  },
  {
    key: '4',
    label: <b>Direct Reports</b>,
    children: (
      <div>
        {' '}
        <DirectReports />
      </div>
    ),
    // extra: genExtra(),
    style: panelStyle,
  },
];

function EmploymentInformation() {
  const { token } = theme.useToken();
  const [formInstance] = Form.useForm();
  const [isButtonHidden, setIsButtonHidden] = useState(true);

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

  const saveEmployeeHandler = (values: any) => {
    console.log('values: ', values);
  };

  const onHireDateChangeHandler = () => {
    setIsButtonHidden(false);
  };

  const onCancelHandler = () => {
    setIsButtonHidden(true);
  };

  return (
    <div>
      <ContactsTwoTone className="text-2xl ml-4" />
      <Typography.Text className="text-2xl ml-4 text-blue-600">
        Employment Information{' '}
      </Typography.Text>
      <Divider className="mt-2" />
      <Form
        name="employee-create-update-form"
        form={formInstance}
        onFinish={saveEmployeeHandler}
        labelAlign="left"
        className="flex"
      >
        <Form.Item
          label="Hire Date"
          name="hire_date"
          rules={[{ required: true, message: 'Please input Hire Date!' }]}
        >
          <DatePicker onChange={onHireDateChangeHandler} />
        </Form.Item>
        <div className="flex">
          <Form.Item hidden={isButtonHidden}>
            <Button htmlType="submit" type="link">
              Save
            </Button>
          </Form.Item>
          <Form.Item hidden={isButtonHidden}>
            <Button
              type="ghost"
              shape="circle"
              icon={<CloseCircleOutlined />}
              style={{ borderRadius: '20px' }}
              onClick={onCancelHandler}
              hidden={isButtonHidden}
            />
          </Form.Item>
        </div>
      </Form>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition="start"
        items={getItems(panelStyle)}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        bordered={false}
      />
    </div>
  );
}

export default EmploymentInformation;
