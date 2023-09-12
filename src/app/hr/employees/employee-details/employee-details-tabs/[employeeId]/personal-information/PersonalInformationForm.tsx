import { Button, Form, Input, Select, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  EmployeeUpdateData,
  PersonalInformationFormProps,
} from './types';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUpdateEmployeeMutation } from './mutations';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCountryListApi } from '@/app/api/country-api';
import { CountryListData } from '@/app/api/country-types';

const { Option } = Select;

export function PersonalInformationForm({
  employee,
  refetchCallback
}: PersonalInformationFormProps) {
  // Form hooks
  const [form] = Form.useForm();

  // router hooks
  const params = useParams();

  // FETCH DATA
  // Construct a useQuery hook that will fetch the country data
  // using the getCountryListApi function. Follow the notes example

  const {
    data: countries,
    error: errorCountries,
    isFetching: isFetchingCountries,
    isLoading: isLoadingCountries,
    status: statusNotes,
  } = useQuery<CountryListData[]>({
    queryKey: ['country-list'],
    queryFn: () => getCountryListApi(),
  });

  useEffect(() => {
    handleSetFieldValue();
  }, [employee]);

  // MUTATIONS
  // Update Employee Mutation
  const updateEmployeeMutation = useUpdateEmployeeMutation();
  const savePersonalInformationHandler = (employee: EmployeeUpdateData) => {
    const employeeId = parseInt(params.employeeId);
    updateEmployeeMutation.mutate({ data: employee, id: employeeId });
    refetchCallback()
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    form.setFieldsValue({
      first_name: employee?.first_name,
      middle_name: employee?.middle_name,
      last_name: employee?.last_name,
      preferred_name: employee?.preferred_name,
      gender: employee?.gender,
      date_of_birth: employee?.date_of_birth,
      marital_status: employee?.marital_status,
      nationality: employee?.nationality,
      social_security_number: employee?.social_security_number,
      national_identification_number: employee?.national_identification_number,
      tax_identification_number: employee?.tax_identification_number,
    });
  };

  const countryOptions = () => {
    return countries?.map((country: any) => ({
      value: country.id,
      label: country.country_name,
    }));
  };

  const genderOptions = () => {
    return [
      { value: 'MALE', label: 'Male' },
      { value: 'FEMALE', label: 'Female' },
    ];
  };

  const maritalStatusOptions = () => {
    return [
      { value: 'SINGLE', label: 'Single' },
      { value: 'MARRIED', label: 'Married' },
    ];
  };

  return (
    <Form
      name="personal-information-update-form"
      form={form}
      labelAlign="left"
      onFinish={savePersonalInformationHandler}
      className="flex flex-wrap"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <div className="w-1/2 pr-4">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Middle Name" name="middle_name">
          <Input prefix={<UserOutlined />} placeholder="Middle Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>
        <Form.Item label="Preferred Name" name="preferred_name">
          <Input prefix={<UserOutlined />} placeholder="Preferred Name" />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            placeholder="Select gender"
            className="w-full"
            options={genderOptions()}
          />
        </Form.Item>
        {/* <Form.Item label="DatePicker">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item> */}
      </div>

      <div className="w-1/2 pl-4">
        <Form.Item label="Marital Status" name="marital_status">
          <Select
            placeholder="Select marital status"
            className="w-full"
            options={maritalStatusOptions()}
          />
        </Form.Item>
        <Form.Item label="Nationality" name="nationality">
          <Select
            placeholder="Select country"
            className="w-full"
            options={countryOptions()}
          />
        </Form.Item>
        <Form.Item label="SSN" name="social_security_number">
          <Input placeholder="Social Security Number" />
        </Form.Item>
        <Form.Item label="NIN" name="national_identification_number">
          <Input placeholder="National Identification Number" />
        </Form.Item>
        <Form.Item label="TIN    " name="tax_identification_number">
          <Input placeholder="Tax Identification Number" />
        </Form.Item>
      </div>

      <div className="w-full flex justify-end">
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updateEmployeeMutation.isLoading}>
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
