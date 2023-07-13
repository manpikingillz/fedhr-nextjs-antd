'use client';

import React from 'react';
import { Card, Space } from 'antd';
import {
  ContainerOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  DollarOutlined,
  ScheduleOutlined,
  FolderOpenOutlined,
  ClockCircleFilled
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

function HRHome() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="flex w-6/12 flex-wrap text-center">
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/company-profile')}
          >
            <SettingOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Company Profile</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/employees')}
          >
            <ContainerOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Employees</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/leave')}
          >
            <FieldTimeOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Time Off</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/recruitment')}
          >
            <UsergroupAddOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Hiring</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/payroll')}
          >
            <DollarOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Payroll</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/time-and-attendance')}
          >
            <ClockCircleFilled className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Time and Attendance</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/schedules')}
          >
            <ScheduleOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Scheduling</p>
        </div>
        <div
          style={{ width: 100, height: 100 }}
          className="flex flex-col items-center cursor-pointer mr-8 mt-16"
        >
          <Card
            className="bg-blue-950"
            onClick={() => router.push('/hr/documents')}
          >
            <FolderOpenOutlined className="text-5xl text-gray-100" />
          </Card>
          <p className="mt-2">Documents</p>
        </div>
      </div>
    </div>
  );
}

export default HRHome;
