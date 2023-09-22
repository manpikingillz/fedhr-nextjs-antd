'use client';

import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Typography,
  Divider,
  Card,
} from 'antd';
import React from 'react';
import { LeftCircleTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
const { Option } = Select;
const { TextArea } = Input;

const CreateJobOpening = () => {
  const router = useRouter();

  const onSubmit = (values) => {
    console.log('Received values from form: ', values);
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
              // labelCol={{ span: 4 }}
              // wrapperCol={{ span: 12 }}
              style={{ maxWidth: '800px', width: '100%' }}
              layout="vertical"
              onFinish={onSubmit}
              labelAlign="left"
              className="w-full"
            >
              <Form.Item
                label="Job Title"
                name="job_title"
                rules={[
                  { required: true, message: 'Please input the job title!' },
                ]}
                className="w-full"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Job Status"
                name="job_status"
                className="w-auto"
              >
                <Select
                  placeholder="Select job status"
                  options={jobStatusOptions}
                />
              </Form.Item>

              {/* Similar pattern for other dropdown fields like hiring_lead, hiring_department, employment_type, location, and country. Just replace the JobStatus with the respective field's choices. */}

              <Form.Item label="Minimum Experience" name="minimum_experience">
                <Select
                  placeholder="Select experience level"
                  options={experienceOptions}
                />
              </Form.Item>

              <Form.Item label="Job Description" name="job_description">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>

              <Form.Item label="Province" name="province">
                <Input />
              </Form.Item>

              <Form.Item label="Postal Code" name="postal_code">
                <Input />
              </Form.Item>

              <Form.Item label="Compensation" name="compensation">
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateJobOpening;
