import { Button, Form, Input } from 'antd';
import {
  LinkedinOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { EmployeeUpdateData, PersonalInformationFormProps } from './types';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUpdateEmployeeMutation } from './mutations';

export function SocialLinksInfoForm({
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
      linked_in: employee?.linked_in,
      facebook: employee?.facebook,
      twitter: employee?.twitter,
      instagram: employee?.instagram,
    });
  };

  return (
    <Form
      name="social-links-update-form"
      form={form}
      labelAlign="left"
      onFinish={savePersonalInformationHandler}
      className="flex flex-wrap"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <div className="w-1/2 pr-4">
        <Form.Item label="LinkedIn" name="linked_in">
          <Input prefix={<LinkedinOutlined />} placeholder="LinkedIn" />
        </Form.Item>
        <Form.Item label="Facebook" name="facebook">
          <Input prefix={<FacebookOutlined />} placeholder="Facebook" />
        </Form.Item>
      </div>

      <div className="w-1/2 pl-4">
        <Form.Item label="Twitter" name="twitter">
          <Input prefix={<TwitterOutlined />} placeholder="Twitter" />
        </Form.Item>
        <Form.Item label="Instagram" name="instagram">
          <Input prefix={<InstagramOutlined />} placeholder="Instagram" />
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
