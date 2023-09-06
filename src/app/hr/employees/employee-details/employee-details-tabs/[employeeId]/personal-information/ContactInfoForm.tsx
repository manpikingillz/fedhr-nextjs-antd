import { Button, Form, Input } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { EmployeeUpdateData, PersonalInformationFormProps } from './types';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUpdateEmployeeMutation } from './mutations';

export function ContactInfoForm({
  employee,
}: PersonalInformationFormProps) {
  // Form hooks
  const [form] = Form.useForm();

  // router hooks
  const params = useParams();

  useEffect(() => {
    handleSetFieldValue();
  }, [employee]);

  // MUTATIONS
  // Update Employee Mutation
  const updateEmployeeMutation = useUpdateEmployeeMutation();
  const savePersonalInformationHandler = (employee: EmployeeUpdateData) => {
    const employeeId = parseInt(params.employeeId);
    updateEmployeeMutation.mutate({ data: employee, id: employeeId });
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    form.setFieldsValue({
      work_phone: employee?.work_phone,
      mobile_number: employee?.mobile_number,
      home_phone: employee?.home_phone,
      email: employee?.email,
      home_email: employee?.home_email,
    });
  };

  return (
    <Form
      name="contact-info-update-form"
      form={form}
      labelAlign="left"
      onFinish={savePersonalInformationHandler}
      className="flex flex-wrap"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <div className="w-1/2 pr-4">
        <Form.Item label="Work Phone" name="work_phone">
          <Input prefix={<PhoneOutlined />} placeholder="Work Phone" />
        </Form.Item>
        <Form.Item label="Mobile Phone" name="mobile_number">
          <Input prefix={<PhoneOutlined />} placeholder="Mobile Phone" />
        </Form.Item>
        <Form.Item label="Home Phone" name="home_phone">
          <Input prefix={<PhoneOutlined />} placeholder="Home Phone" />
        </Form.Item>
      </div>

      <div className="w-1/2 pl-4">
        <Form.Item label="Work Email" name="email">
          <Input prefix={<MailOutlined />} placeholder="Work Email" />
        </Form.Item>
        <Form.Item label="Home Email" name="home_email">
          <Input prefix={<MailOutlined />} placeholder="Home Email" />
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
