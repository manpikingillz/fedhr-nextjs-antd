import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import {
  EducationAwardListData,
  EducationCreateData,
  EducationFormProps,
  EducationUpdateData,
} from './types';
import { getEducationAwardListApi } from './api';
import {
  useCreateEducationMutation,
  useUpdateEducationMutation,
} from './mutations';

const EducationCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  educationData,
}: EducationFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: educationAwards,
    error: errorEducationAwards,
    isFetching: isFetchingEducationAwards,
    isLoading: isLoadingEducationAwards,
    status: statusEducationAwards,
  } = useQuery<EducationAwardListData[]>({
    queryKey: ['education_award-list'],
    queryFn: () => getEducationAwardListApi(),
  });

  useEffect(() => {
    if (educationData) {
      handleSetFieldValue();
    }
  }, [educationData]);

  // MUTATIONS
  // Update Employee Mutation
  const createEducationMutation = useCreateEducationMutation();
  const updateEducationMutation = useUpdateEducationMutation();

  const createEducation = (_education: EducationCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _education['employee'] = employeeId;
    createEducationMutation.mutate({ data: _education });
  };

  const updateEducation = (_education: EducationUpdateData) => {
    _education['employee'] = educationData?.employee?.id;
    updateEducationMutation.mutate({ data: _education, id: educationData?.id });
  };

  const savePersonalInformationHandler = (
    _education: EducationCreateData | EducationUpdateData
  ) => {
    if (Object.keys(educationData).length) {
      updateEducation(_education);
    } else {
      createEducation(_education);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      institution_name: educationData?.institution_name,
      award: educationData?.award?.id,
      major: educationData?.major,
      start_date: educationData?.start_date,
      end_date: educationData?.end_date,
      score: educationData?.score,
    });
  };

  const awardOptions = () => {
    return educationAwards?.map((educationAward: any) => ({
      value: educationAward.id,
      label: educationAward.education_award_name,
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }
    onModelClose();
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Education"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="education-create-form"
            form={formInstance}
            onFinish={savePersonalInformationHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Insitution"
              name="institution_name"
              rules={[
                { required: true, message: 'Please input Institution name!' },
              ]}
            >
              <Input placeholder="Insitution Name" />
            </Form.Item>
            <Form.Item label="Award" name="award">
              <Select
                placeholder="Select"
                className="w-full"
                options={awardOptions()}
              />
            </Form.Item>
            <Form.Item
              label="Major"
              name="major"
              rules={[{ required: true, message: 'Please input major!' }]}
            >
              <Input placeholder="Major" />
            </Form.Item>
            <Form.Item label="Start Date" name="start_date">
              <Input placeholder="Start Date" />
            </Form.Item>
            <Form.Item label="End Date" name="end_date">
              <Input placeholder="End Date" />
            </Form.Item>
            <Form.Item label="Score" name="score">
              <Input placeholder="Score" />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default EducationCreateUpdateModal;
