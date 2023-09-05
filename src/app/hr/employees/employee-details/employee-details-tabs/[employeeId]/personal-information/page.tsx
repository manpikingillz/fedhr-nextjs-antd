'use client';

import { Card, Form, Input, Select, Button } from 'antd';
import React from 'react';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import Education from './education/Education';
import { useQuery } from '@tanstack/react-query';
import { EmployeeDetail } from './types';
import { getEmployee } from './api';
import { useParams } from 'next/navigation';
import VisaInformation from './visa/Visa';
import * as dayjs from 'dayjs'
import { PersonalInformationForm } from './PersonalInformationForm';
import { PersonalInformationView } from './PersonalInformationView';

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
        <PersonalInformationView employee={employee}/>
        <PersonalInformationForm />
      </Card>
      
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
