import { Button, Form, Input, Select, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EmployeeDetail, EmployeeUpdateData, PersonalInformationFormProps } from './types';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUpdateEmployeeMutation } from './mutations';

const { Option } = Select;

export function PersonalInformationForm({
  employee,
}: PersonalInformationFormProps) {
  const [form] = Form.useForm();
  const params = useParams()

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

  useEffect(() => {
    handleSetFieldValue();
  }, [employee]);

  const updateEmployeeMutation = useUpdateEmployeeMutation()
  const savePersonalInformationHandler = (employee: EmployeeUpdateData) => {
    console.log('Received values of form: ', employee);
    console.log('params: ', params)
    const employeeId = parseInt(params.employeeId)
    updateEmployeeMutation.mutate({data: employee, id: employeeId, })
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
          <Select placeholder="Select gender" className="w-full">
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item label="DatePicker">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item> */}
      </div>

      <div className="w-1/2 pl-4">
        <Form.Item label="Marital Status" name="marital_status">
          <Select placeholder="Select marital status" className="w-full">
            <Option value="SINGLE">Single</Option>
            <Option value="MARRIED">Married</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Nationality" name="nationality">
          <Select placeholder="Select country" className="w-full">
            <Option value="country1">Country 1</Option>
            <Option value="country2">Country 2</Option>
          </Select>
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
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
