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
} from 'antd';
import React, { useEffect, useState } from 'react';
import { LeftCircleTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useForm } from 'antd/es/form/Form';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const { Option } = Select;
const { TextArea } = Input;

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

const CreateJobOpening = () => {
  const router = useRouter();
  const [form] = useForm();

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
              form={form}
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
              <Form.Item
                label="Hiring Lead"
                name="hiring_lead"
                className="w-auto"
              >
                <Select
                  placeholder="Select Hiring Lead"
                  options={jobStatusOptions}
                />
              </Form.Item>
              <Form.Item
                label="Department"
                name="hiring_department"
                className="w-auto"
              >
                <Select
                  placeholder="Select Department"
                  options={jobStatusOptions}
                />
              </Form.Item>
              <Form.Item
                label="Employment Type"
                name="employment_type"
                className="w-auto"
              >
                <Select
                  placeholder="Select Employment Type"
                  options={jobStatusOptions}
                />
              </Form.Item>

              <Form.Item label="Minimum Experience" name="minimum_experience">
                <Select
                  placeholder="Select experience level"
                  options={experienceOptions}
                />
              </Form.Item>

              <Form.Item label="" name="requiredMarkValue">
                    <Radio.Group>
                    <Radio.Button value>Office</Radio.Button>
                    <Radio.Button value="optional">Hybrid</Radio.Button>
                    <Radio.Button value="customize">Remote</Radio.Button>
                    </Radio.Group>
                </Form.Item>

              <Form.Item label="Location" name="location">
                <Select
                  placeholder="Select Location"
                  options={experienceOptions}
                />
              </Form.Item>

              <Form.Item name="job_description" label="Job Description">
                <TiptapEditor
                  onChange={(content) => {
                    form.setFieldsValue({ job_description: content });
                  }}
                />
              </Form.Item>

              <Form.Item label="Internal Job Code" name="internal_job_code">
                <Input />
              </Form.Item>

              <Form.Item label="Available Positions" name="available_positions">
                <InputNumber />
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

              <Form.Item label="Currency" name="currency">
                <Select
                  placeholder="Select Location"
                  options={experienceOptions}
                />
              </Form.Item>
              <Form.Item label="Hourly or Monthly" name="currency">
                <Select
                  placeholder="Select Location"
                  options={experienceOptions}
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
