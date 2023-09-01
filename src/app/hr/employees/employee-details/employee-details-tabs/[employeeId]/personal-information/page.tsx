'use client';

import { Card, Form, Input, Select, Button } from 'antd';
import React from 'react';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

function PersonalInformation() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Make API call to your Django backend here
  };

  return (
    <>
      <Card title="Basic Info" bordered={true} size="small">
        <div className="flex">
          <div className='w-1/2'>
            <div className="flex mb-2">
              <strong className="bg-gray-50	 flex-1 p-1 w-1/3">First Name:</strong>
              <span className="flex-2 p-1 w-2/3 ">John</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1  w-1/3">Middle Name:</strong>
              <span className="flex-2 p-1 w-2/3 ">Doe</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">Last Name:</strong>
              <span className="flex-2 p-1 w-2/3 ">Smith</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">
                Preferred Name:
              </strong>
              <span className="flex-2 p-1 w-2/3 ">Johnny</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">Gender:</strong>
              <span className="flex-2 p-1 w-2/3 ">Male</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">
                Marital Status:
              </strong>
              <span className="flex-2 p-1 w-2/3 ">Single</span>
            </div>
          </div>

          <div className='w-1/2'>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">Nationality:</strong>
              <span className="flex-2 p-1 w-2/3 ">Country 1</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">
                Social Security Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 ">123-45-6789</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">
                National Identification Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 ">987654321</span>
            </div>
            <div className="flex mb-2">
              <strong className="bg-gray-50 flex-1 p-1 w-1/3">
                Tax Identification Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 ">12-3456789</span>
            </div>
          </div>
        </div>
      </Card>

      {/* <Form layout="vertical" onFinish={onFinish} className="flex flex-wrap">
          <div className="w-1/2 pr-4">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
            <Form.Item label="Middle Name" name="middle_name">
              <Input prefix={<UserOutlined />} placeholder="Middle Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
            <Form.Item label="Preferred Name" name="preferred_name">
              <Input prefix={<UserOutlined />} placeholder="Preferred Name" />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select placeholder="Select gender" className="w-full">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Marital Status" name="marital_status">
              <Select placeholder="Select marital status" className="w-full">
                <Option value="single">Single</Option>
                <Option value="married">Married</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="w-1/2 pl-4">
            <Form.Item label="Nationality" name="nationality">
              <Select placeholder="Select country" className="w-full">
                <Option value="country1">Country 1</Option>
                <Option value="country2">Country 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Social Security Number"
              name="social_security_number"
            >
              <Input placeholder="Social Security Number" />
            </Form.Item>
            <Form.Item
              label="National Identification Number"
              name="national_identification_number"
            >
              <Input placeholder="National Identification Number" />
            </Form.Item>
            <Form.Item
              label="Tax Identification Number"
              name="tax_identification_number"
            >
              <Input placeholder="Tax Identification Number" />
            </Form.Item>
          </div>

          <div className="w-full">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form> */}

      <Card title="Contact Info" bordered={true} size="small">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Address Info" bordered={true} size="small">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Social Links" bordered={true} size="small">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Education" bordered={true} size="small">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Visa Information" bordered={true} size="small">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  );
}

export default PersonalInformation;
