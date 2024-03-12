'use client';

import './editor.scss';
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Typography,
  Divider,
  Card,
  Radio,
  Affix,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  LeftCircleTwoTone,
  ProfileTwoTone,
  HomeOutlined,
  LaptopOutlined,
  InsertRowLeftOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useForm } from 'antd/es/form/Form';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EmployeeListData } from '../../employees/employee-details/employee-details-tabs/[employeeId]/personal-information/types';
import { getEmployeeListApi } from '../../employees/employees-tabs/api';
import { useQuery } from '@tanstack/react-query';
import {
  DepartmentListData,
  LocationListData,
} from '../../employees/employee-details/employee-details-tabs/[employeeId]/employment-information/job-information/types';
import {
  getDepartmentListApi,
  getLocationListApi,
} from '../../employees/employee-details/employee-details-tabs/[employeeId]/employment-information/job-information/api';
import { EmploymentStatusTypeListData } from '../../employees/employee-details/employee-details-tabs/[employeeId]/employment-information/employment-status/types';
import { getEmploymentStatusTypeListApi } from '../../employees/employee-details/employee-details-tabs/[employeeId]/employment-information/employment-status/api';
import { CountryListData } from '@/app/api/country-types';
import { getCountryListApi } from '@/app/api/country-api';
import {
  EmploymentTypeListData,
  JobOpeningCreateData,
  JobOpeningListData,
  JobOpeningUpdateData,
} from '@/app/types/jop-opening-types';
import { getEmploymentTypeListApi } from '@/app/api/job-opening-api';
import {
  useCreateJobOpeningMutation,
  useUpdateJobOpeningMutation,
} from '@/app/mutations/job-opening-mutations';
import AdditionalQuestions from './AdditionalQuestions';
import ApplicationQuestions from './ApplicationQuestions';

const { Option } = Select;
const { TextArea } = Input;

type Question = {
  question: string;
  icon: string;
  key: string;
  required: boolean;
};

const TiptapEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onChange(content);
    },
  });

  // Cleanup on component unmount
  return (
    <EditorContent
      editor={editor}
      style={{
        backgroundColor: 'white',
        cursor: 'text',
        borderRadius: '0.5em',
        minHeight: '100px',
        borderColor: '#D9D9D9',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    />
  );
};

const CreateUpdateJobOpening = ({
  jobOpeningData,
}: {
  jobOpeningData?: JobOpeningListData;
}) => {
  const router = useRouter();
  const [formInstance] = useForm();
  const [questions, setQuestions] = useState<Question[]>();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: employeeList,
    error: errorEmployeeList,
    isFetching: isFetchingEmployeeList,
    isLoading: isLoadingEmployeeList,
    status: statusEmployeeList,
  } = useQuery<EmployeeListData[]>({
    queryKey: ['employee-list'],
    queryFn: () => getEmployeeListApi(),
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
    data: countryList,
    error: errorCountryList,
    isFetching: isFetchingCountryList,
    isLoading: isLoadingCountryList,
    status: statusCountryList,
  } = useQuery<CountryListData[]>({
    queryKey: ['country-list'],
    queryFn: () => getCountryListApi(),
  });

  const {
    data: employmentTypeList,
    error: errorEmploymentTypeList,
    isFetching: isFetchingEmploymentTypeList,
    isLoading: isLoadingEmploymentTypeList,
    status: statusEmploymentTypeList,
  } = useQuery<EmploymentTypeListData[]>({
    queryKey: ['employment-type-list'],
    queryFn: () => getEmploymentTypeListApi(),
  });

  // MUTATIONS
  const createJobOpeningMutation = useCreateJobOpeningMutation();
  const updateJobOpeningMutation = useUpdateJobOpeningMutation();

  const createJobOpening = (_jobOpening: JobOpeningCreateData) => {
    createJobOpeningMutation.mutate({ data: _jobOpening });
  };

  const updateJobOpening = (_jobOpening: JobOpeningUpdateData) => {
    updateJobOpeningMutation.mutate({
      data: _jobOpening,
      id: jobOpeningData?.id,
    });
  };

  const saveJobOpeningHandler = (
    _jobOpening: JobOpeningCreateData | JobOpeningUpdateData
  ) => {
    console.log('Received values from form: ', _jobOpening);
    if (jobOpeningData && Object.keys(jobOpeningData).length) {
      updateJobOpening(_jobOpening);
    } else {
      createJobOpening(_jobOpening);
    }
  };

  useEffect(() => {
    if (jobOpeningData) {
      handleSetFieldValue();
    }
  }, [jobOpeningData]);

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      job_title: jobOpeningData?.job_title,
      job_status: jobOpeningData?.job_status,
      hiring_lead: jobOpeningData?.hiring_lead.id,
      hiring_department: jobOpeningData?.hiring_department.id,
      employment_type: jobOpeningData?.employment_type.id,
      minimum_experience: jobOpeningData?.minimum_experience,
      job_description: jobOpeningData?.job_description,
      location: jobOpeningData?.location.id,
      location_type: jobOpeningData?.location_type,
      compensation: jobOpeningData?.compensation,
      compensation_currency: jobOpeningData?.compensation_currency,
      compensation_type: jobOpeningData?.compensation_type,
      available_positions: jobOpeningData?.available_positions,
      internal_job_code: jobOpeningData?.internal_job_code,
    });
  };

  const hiringLeadOptions = () => {
    return employeeList?.map((employee: EmployeeListData) => ({
      value: employee.id,
      label: employee.first_name + ' ' + employee.last_name,
    }));
  };

  const hiringDepartmentOptions = () => {
    return departmentList?.map((department: DepartmentListData) => ({
      value: department.id,
      label: department.department_name,
    }));
  };

  const locationOptions = () => {
    return locationList?.map((location: LocationListData) => ({
      value: location.id,
      label: location.location_name,
    }));
  };

  const countryOptions = () => {
    return countryList?.map((country: CountryListData) => ({
      value: country.id,
      label: country.country_name,
    }));
  };

  const employmentTypeOptions = () => {
    return employmentTypeList?.map(
      (employmentType: EmploymentTypeListData) => ({
        value: employmentType.id,
        label: employmentType.employment_type_name,
      })
    );
  };

  const jobStatusOptions = [
    { value: 'DRAFT', label: 'Draft' },
    { value: 'OPEN', label: 'Open' },
    { value: 'ON_HOLD', label: 'On Hold' },
    { value: 'FILLED', label: 'Filled' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  const experienceOptions = [
    { value: 'ENTRY_LEVEL', label: 'Entry Level' },
    { value: 'MID_LEVEL', label: 'Mid Level' },
    { value: 'EXPERIENCED', label: 'Experienced' },
    { value: 'MANAGER', label: 'Manager' },
    { value: 'EXECUTIVE', label: 'Executive' },
    { value: 'SENIOR_EXECUTIVE', label: 'Senior Executive' },
  ];

  const compensationCurrencyOptions = [
    { value: 'UGX', label: 'UGX' },
    { value: 'USD', label: 'USD' },
    { value: 'GBP', label: 'GBP' },
    { value: 'KES', label: 'KES' },
    { value: 'TZS', label: 'TZS' },
    { value: 'RWF', label: 'RWF' },
    { value: 'SDG', label: 'SDG' },
  ];

  const hourlyOrMonthlyOptions = [
    { value: 'MONTHLY', label: 'Monthly' },
    { value: 'HOURLY', label: 'Hourly' },
  ];

  const locationTypeOptions = [
    {
      value: 'OFFICE',
      label: 'Office',
      icon: <InsertRowLeftOutlined className="mr-2" />,
    },
    {
      value: 'HYBRID',
      label: 'Hybrid',
      icon: <HomeOutlined className="mr-2" />,
    },
    {
      value: 'REMOTE',
      label: 'Remote',
      icon: <LaptopOutlined className="mr-2" />,
    },
  ];

  const onQuestionsChangeHandler = (questions) => {
    setQuestions(() => [...questions]);
    console.log('question::::: ', questions);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <Button
            icon={<LeftCircleTwoTone />}
            type="link"
            className="mb-1"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex">
            <ProfileTwoTone className="text-2xl ml-4" />
            <Typography.Text className="text-2xl ml-4 text-blue-600">
              New Job Opening
            </Typography.Text>
          </div>
          <Divider className="mt-2" />
          <Card style={{ width: 840 }} hoverable className="bg-gray-50">
            <Form
              form={formInstance}
              style={{ maxWidth: '800px', width: '100%' }}
              layout="vertical"
              onFinish={saveJobOpeningHandler}
              labelAlign="left"
              className="w-full"
            >
              <div className="flex flex-1 gap-x-3">
                <Form.Item
                  label="Job Title"
                  name="job_title"
                  rules={[
                    { required: true, message: 'Please input the job title!' },
                  ]}
                  className="basis-1/2"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Job Status"
                  name="job_status"
                  className="basis-1/2"
                >
                  <Select
                    placeholder="Select job status"
                    options={jobStatusOptions}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-1 gap-x-3">
                <div className="basis-1/2">
                  <label className="block mb-2">Compensation</label>
                  <div className="flex gap-x-3">
                    <Form.Item
                      name="compensation_currency"
                      className="basis-1/4"
                    >
                      <Select
                        placeholder="Select"
                        options={compensationCurrencyOptions}
                        defaultValue="USD"
                      />
                    </Form.Item>

                    <div className="basis-1/4">
                      <Form.Item name="compensation">
                        <InputNumber
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          className="w-full"
                          min={0}
                          defaultValue={0}
                        />
                      </Form.Item>
                    </div>

                    <Form.Item>
                      <Radio.Group defaultValue="MONTHLY">
                        {hourlyOrMonthlyOptions.map((item, index) => (
                          <Radio.Button key={index} value={item.value}>
                            {item.label}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>

                <div className="basis-1/2 w-full">
                  <Form.Item
                    label="Available Positions"
                    name="available_positions"
                  >
                    <InputNumber min={1} defaultValue={1} />
                  </Form.Item>
                </div>
              </div>

              <div className="flex flex-1 gap-x-3">
                <Form.Item
                  label="Hiring Lead"
                  name="hiring_lead"
                  className="basis-1/2"
                >
                  <Select
                    placeholder="Select Hiring Lead"
                    options={hiringLeadOptions()}
                  />
                </Form.Item>
                <Form.Item
                  label="Department"
                  name="hiring_department"
                  className="basis-1/2"
                >
                  <Select
                    placeholder="Select Department"
                    options={hiringDepartmentOptions()}
                  />
                </Form.Item>
              </div>

              <div className="flex flex-1 gap-x-3">
                <Form.Item
                  label="Employment Type"
                  name="employment_type"
                  className="basis-1/2"
                >
                  <Select
                    placeholder="Select Employment Type"
                    options={employmentTypeOptions()}
                  />
                </Form.Item>

                <Form.Item
                  label="Minimum Experience"
                  name="minimum_experience"
                  className="basis-1/2"
                >
                  <Select
                    placeholder="Select experience level"
                    options={experienceOptions}
                  />
                </Form.Item>
              </div>

              <div>
                <label className="block mb-2">Location</label>
                <Form.Item name="location_type">
                  <Radio.Group className="text-sm" defaultValue="">
                    {locationTypeOptions.map((item, index) => (
                      <Radio.Button key={index} value={item.value}>
                        {item.icon}
                        {item.label}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>

              <Form.Item name="location">
                <Select
                  placeholder="Select Location"
                  options={locationOptions()}
                />
              </Form.Item>

              <Form.Item name="job_description" label="Job Description">
                <TiptapEditor
                  onChange={(content) => {
                    formInstance.setFieldsValue({ job_description: content });
                  }}
                />
              </Form.Item>

              <div className="flex">
                <Form.Item name="internal_job_code" label="Internal Job Code">
                  <Input />
                </Form.Item>
              </div>
            </Form>
            <div className="mb-3">
              <ApplicationQuestions />
            </div>
            <div>
              <AdditionalQuestions
                onQuestionsChangeHandler={onQuestionsChangeHandler}
              />
            </div>

            {/* <Button type="primary" className="mt-4">
              Save Job Opening
            </Button> */}
            <Affix offsetBottom={0} className='mt-8'>
              <Card className='bg-zinc-500 rounded-none'>
                <Button type="primary" size="large">
                  <CheckCircleOutlined />
                  Save Job Opening
                </Button>
                <Button
                  type="link"
                  size="large"
                  style={{ color: '#ffffff' }}
                  // onClick={onJobViewDescription}
                >
                  Cancel
                </Button>
              </Card>
            </Affix>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateJobOpening;
