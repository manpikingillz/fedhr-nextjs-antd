'use client';

import { Card, Form, Input, Select, Button } from 'antd';
import React from 'react';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import Education from './education/Education';
import Visa from './visa/Visa';
import { useQuery } from '@tanstack/react-query';
import { EmployeeDetail } from './types';
import { getEmployee } from './api';
import { useParams } from 'next/navigation';
import VisaInformation from './visa/Visa';

const { Option } = Select;

function PersonalInformation() {
  // router hooks
  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: employee,
    error: errorEmployee,
    isFetching: isFetchingEmployee,
    isLoading: isLoadingEmployee,
    status: statusEmployee
  } = useQuery<EmployeeDetail>({
    queryKey: ['employee', params.employeeId],
    queryFn: () => getEmployee(parseInt(params.employeeId)),
  });

  return (
    <>
      <Card
        title="Basic Info"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
      >
        <div className="flex">
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">First Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.first_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Middle Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.middle_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Last Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.last_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Preferred Name:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.preferred_name}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Gender:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.gender}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Date of Birth:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.date_of_birth}</span>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Marital Status:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.marital_status}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Nationality:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.nationality}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">
                Social Security Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.social_security_number}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">
                National Identification Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.national_identification_number}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">
                Tax Identification Number:
              </strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.tax_identification_number}</span>
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

      <Card
        title="Contact Info"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        className="mt-3"
      >
        <div className="flex">
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Work Phone:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.work_phone}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Mobile Phone:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.mobile_number}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">Home Phone:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.home_phone}
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Work Email:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.email}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Home Email:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.home_email}
              </span>
            </div>
          </div>
        </div>
      </Card>
      <Card
        title="Address Info"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        className="mt-3"
      >
        <div className="flex">
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Street 1:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.street1}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Street 2:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.street2}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">City:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.city}</span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Province:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.province}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Zip Code:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.zip_code}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Country:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.country}</span>
            </div>
          </div>
        </div>
      </Card>
      <Card
        title="Social Links"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        className="mt-3"
      >
        <div className="flex">
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">LinkedIn:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.linked_in}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Facebook:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.facebook}
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex mb-2">
              <strong className="	 flex-1 p-1 w-1/3">Twitter:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.twitter}</span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Instagram:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">{employee?.instagram}</span>
            </div>
          </div>
        </div>
      </Card>
      <Card
        title="Education"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        className="mt-3"
      >
        <Education />
      </Card>
      <Card
        title="Visa Information"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        className="mt-3"
      >
        <VisaInformation />
      </Card>
    </>
  );
}

export default PersonalInformation;
