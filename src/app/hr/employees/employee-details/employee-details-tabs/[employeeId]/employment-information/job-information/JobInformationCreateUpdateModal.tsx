import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';

import {
  DepartmentListData,
  DivisionListData,
  JobInformationCreateData,
  JobInformationFormProps,
  JobInformationUpdateData,
  JobListData,
  LocationListData,
} from './types';
import { getDepartmentListApi, getDivisionListApi, getJobListApi, getLocationListApi } from './api';
import {
  useCreateJobInformationMutation,
  useUpdateJobInformationMutation,
} from './mutations';

const JobInformationCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  jobInformationData,
}: JobInformationFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: locationList,
    error: errorLocationList,
    isFetching: isFetchingLocationList,
    isLoading: isLoadingLocationList,
    status: statusLocationList,
  } = useQuery<LocationListData[]>({
    queryKey: ['location-list'],
    queryFn: () => getLocationListApi(),
  });

  const {
    data: divisionList,
    error: errorDivisionList,
    isFetching: isFetchingDivisionList,
    isLoading: isLoadingDivisionList,
    status: statusDivisionList,
  } = useQuery<DivisionListData[]>({
    queryKey: ['division-list'],
    queryFn: () => getDivisionListApi(),
  });

  const {
    data: departmentList,
    error: errorDepartmentList,
    isFetching: isFetchingDepartmentList,
    isLoading: isLoadingDepartmentList,
    status: statusDepartmentList,
  } = useQuery<DepartmentListData[]>({
    queryKey: ['department-list'],
    queryFn: () => getDepartmentListApi(),
  });

  const {
    data: jobList,
    error: errorJobList,
    isFetching: isFetchingJobList,
    isLoading: isLoadingJobList,
    status: statusJobList,
  } = useQuery<JobListData[]>({
    queryKey: ['job-list'],
    queryFn: () => getJobListApi(),
  });

  useEffect(() => {
    if (jobInformationData) {
      handleSetFieldValue();
    }
  }, [jobInformationData]);

  // MUTATIONS
  const createJobInformationMutation = useCreateJobInformationMutation();
  const updateJobInformationMutation = useUpdateJobInformationMutation();

  const createJobInformation = (_jobInformation: JobInformationCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _jobInformation['employee'] = employeeId;
    _jobInformation['effective_date'] = dayjs(_jobInformation['effective_date']).format('YYYY-MM-DD');

    createJobInformationMutation.mutate({ data: _jobInformation });
  };

  const updateJobInformation = (_jobInformation: JobInformationUpdateData) => {
    _jobInformation['employee'] = jobInformationData?.employee?.id;
    _jobInformation['effective_date'] = _jobInformation['effective_date'] ? dayjs(_jobInformation['effective_date']).format('YYYY-MM-DD'): null;
  
    updateJobInformationMutation.mutate({ data: _jobInformation, id: jobInformationData?.id });
  };

  const saveJobInformationHandler = (
    _jobInformation: JobInformationCreateData | JobInformationUpdateData
  ) => {
    if (Object.keys(jobInformationData).length) {
      updateJobInformation(_jobInformation);
    } else {
      createJobInformation(_jobInformation);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      effective_date: jobInformationData?.effective_date ? dayjs(jobInformationData?.effective_date) : null,
      location: jobInformationData.location?.id,
      division: jobInformationData.division?.id,
      department: jobInformationData.department?.id,
      job: jobInformationData.job?.id,
      reports_to: jobInformationData.reports_to?.id
    });
  };

  const locationOptions = () => {
    return locationList?.map((location: LocationListData) => ({
      value: location.id,
      label: location.location_name,
    }));
  };

  const divisionOptions = () => {
    return divisionList?.map((division: DivisionListData) => ({
      value: division.id,
      label: division.division_name,
    }));
  };

  const departmentOptions = () => {
    return departmentList?.map((department: DepartmentListData) => ({
      value: department.id,
      label: department.department_name,
    }));
  };

  const jobOptions = () => {
    return jobList?.map((job: JobListData) => ({
      value: job.id,
      label: job.job_title_name,
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (createJobInformationMutation.isSuccess || updateJobInformationMutation.isSuccess) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Job Information"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createJobInformationMutation.isLoading || updateJobInformationMutation.isLoading}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="job-information-create-update-form"
            form={formInstance}
            onFinish={saveJobInformationHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Effective Date"
              name="effective_date"
              rules={[
                { required: true, message: 'Please input Effective Date!' },
              ]}
            >
              <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Select
                placeholder="Select"
                className="w-full"
                options={locationOptions()}
              />
            </Form.Item>
            <Form.Item label="Division" name="division">
              <Select
                placeholder="Select"
                className="w-full"
                options={divisionOptions()}
              />
            </Form.Item>
            <Form.Item label="Department" name="department">
              <Select
                placeholder="Select"
                className="w-full"
                options={departmentOptions()}
              />
            </Form.Item>
            <Form.Item label="Job" name="job">
              <Select
                placeholder="Select"
                className="w-full"
                options={jobOptions()}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default JobInformationCreateUpdateModal;
