'use client';

import { Card, Typography, Divider } from 'antd';
import React, { useState } from 'react';
import {
  EditOutlined,
  ProfileTwoTone
} from '@ant-design/icons';
import Education from './education/Education';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EmployeeDetailData } from './types';
import { getEmployeeApi } from './api';
import { useParams } from 'next/navigation';
import VisaInformation from './visa/Visa';
import { PersonalInformationForm } from './PersonalInformationForm';
import { PersonalInformationView } from './PersonalInformationView';
import { ContactInfoView } from './ContactInfoView';
import { ContactInfoForm } from './ContactInfoForm';
import { AddressInfoView } from './AddressInfoView';
import { AddressInfoForm } from './AddressInfoForm';
import { SocialLinksInfoView } from './SocialLinksInfoView';
import { SocialLinksInfoForm } from './SocialLinksInfoForm';
import { ErrorPage } from '@/app/error/errorPage';


function PersonalInformation() {
  const [isEditPersonalInformation, setIsEditPersonalInformation] =
    useState(false);
  const [isEditContactInfo, setIsEditContactInfo] = useState(false);
  const [isEditAddressInfo, setIsEditAddressInfo] = useState(false);
  const [isEditSocialLinksInfo, setIsEditSocialLinksInfo] = useState(false);

  // router hooks
  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: employee,
    error: errorEmployee,
    isFetching: isFetchingEmployee,
    isLoading: isLoadingEmployee,
    status: statusEmployee,
    refetch
  } = useQuery<EmployeeDetailData>({
    queryKey: ['employee', params.employeeId],
    queryFn: () => getEmployeeApi(parseInt(params.employeeId))
  });

  //Other functions
  const onEditPersonalInformationHandler = () => {
    setIsEditPersonalInformation(!isEditPersonalInformation);
  };
  const onEditContactInfoHandler = () => {
    setIsEditContactInfo(!isEditContactInfo);
  };
  const onEditAddressInfoHandler = () => {
    setIsEditAddressInfo(!isEditAddressInfo);
  };

  const onEditSocialLinksInfoHandler = () => {
    setIsEditSocialLinksInfo(!isEditSocialLinksInfo);
  };
  const queryClient = useQueryClient()
  const refetchCallback = () => {
    refetch()
    setIsEditPersonalInformation(!isEditPersonalInformation);
  }

  return (
    <>
      <ProfileTwoTone className='text-2xl ml-4'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'>Personal Information </Typography.Text>
      <Divider className='mt-2'/>
      {errorEmployee ? (
        <ErrorPage error={errorEmployee} />
      ) : (
        <div>
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
            loading={isLoadingEmployee || isFetchingEmployee}
          >
            {isEditPersonalInformation ? (
              <PersonalInformationForm employee={employee} refetchCallback={refetchCallback} />
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
              <a onClick={onEditContactInfoHandler} className="cursor-pointer">
                <EditOutlined className="mr-2" />
                Edit
              </a>
            }
            loading={isLoadingEmployee || isFetchingEmployee}
          >
            {isEditContactInfo ? (
              <ContactInfoForm employee={employee} />
            ) : (
              <ContactInfoView employee={employee} />
            )}
          </Card>
          <Card
            title="Address Info"
            bordered={true}
            size="small"
            headStyle={{ backgroundColor: '#F2F2F2' }}
            className="mt-3"
            extra={
              <a onClick={onEditAddressInfoHandler} className="cursor-pointer">
                <EditOutlined className="mr-2" />
                Edit
              </a>
            }
            loading={isLoadingEmployee || isFetchingEmployee}
          >
            {isEditAddressInfo ? (
              <AddressInfoForm employee={employee} />
            ) : (
              <AddressInfoView employee={employee} />
            )}
          </Card>
          <Card
            title="Social Links"
            bordered={true}
            size="small"
            headStyle={{ backgroundColor: '#F2F2F2' }}
            className="mt-3"
            extra={
              <a
                onClick={onEditSocialLinksInfoHandler}
                className="cursor-pointer"
              >
                <EditOutlined className="mr-2" />
                Edit
              </a>
            }
            loading={isLoadingEmployee || isFetchingEmployee}
          >
            {isEditSocialLinksInfo ? (
              <SocialLinksInfoForm employee={employee} />
            ) : (
              <SocialLinksInfoView employee={employee} />
            )}
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
        </div>
      )}
    </>
  );
}

export default PersonalInformation;
