'use client';

import { Card, Form, Input, Select, Button } from 'antd';
import React, { useState } from 'react';
import {
  CalendarOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import Education from './education/Education';
import { useQuery } from '@tanstack/react-query';
import { EmployeeDetailData } from './types';
import { getEmployeeApi } from './api';
import { useParams } from 'next/navigation';
import VisaInformation from './visa/Visa';
import * as dayjs from 'dayjs';
import { PersonalInformationForm } from './PersonalInformationForm';
import { PersonalInformationView } from './PersonalInformationView';
import { ContactInfoView } from './ContactInfoView';
import { ContactInfoForm } from './ContactInfoForm';

const { Option } = Select;

function PersonalInformation() {
  const [isEditPersonalInformation, setIsEditPersonalInformation] = useState(false);
  const [isEditContactInfo, setIsEditContactInfo] = useState(false);
  // router hooks
  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: employee,
    error: errorEmployee,
    isFetching: isFetchingEmployee,
    isLoading: isLoadingEmployee,
    status: statusEmployee,
  } = useQuery<EmployeeDetailData>({
    queryKey: ['employee', params.employeeId],
    queryFn: () => getEmployeeApi(parseInt(params.employeeId)),
  });

  //Other functions
  const onEditPersonalInformationHandler = () => {
    setIsEditPersonalInformation(!isEditPersonalInformation);
  };
  const onEditContactInfoHandler = () => {
    setIsEditContactInfo(!isEditContactInfo);
  };

  return (
    <>
      <Card
        title="Basic Info"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        extra={
          <a
            onClick={onEditPersonalInformationHandler}
            className="cursor-pointer"
          >
            <EditOutlined className="mr-2" />
            Edit
          </a>
        }
      >
        {isEditPersonalInformation ? (
          <PersonalInformationForm employee={employee} />
        ) : (
          <PersonalInformationView employee={employee} />
        )}
      </Card>

      <Card
        title="Contact Info"
        bordered={true}
        size="small"
        headStyle={{ backgroundColor: '#F2F2F2' }}
        className="mt-3"
        extra={
          <a
            onClick={onEditContactInfoHandler}
            className="cursor-pointer"
          >
            <EditOutlined className="mr-2" />
            Edit
          </a>
        }
      >
        {isEditContactInfo ? (
          <ContactInfoForm employee={employee}/>
        ) : (
          <ContactInfoView employee={employee}/>
        )}
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
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.street2}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1 w-1/3">City:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.city}
              </span>
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
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.zip_code}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Country:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.country}
              </span>
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
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.twitter}
              </span>
            </div>
            <div className="flex mb-2">
              <strong className=" flex-1 p-1  w-1/3">Instagram:</strong>
              <span className="flex-2 p-1 w-2/3 bg-gray-50">
                {employee?.instagram}
              </span>
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
