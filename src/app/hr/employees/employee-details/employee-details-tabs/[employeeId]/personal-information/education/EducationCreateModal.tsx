import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { EmployeeUpdateData } from '../types';
import { EducationAwardListData, EducationCreateData } from './types';
import { getEducationAwardListApi } from './api';
import { useCreateEducationMutation } from './mutations';

const { Option } = Select;

const EducationCreateModal = ({
  isModelOpen,
  onModelClose,
}: {
  isModelOpen: boolean;
  onModelClose: () => void;
}) => {
  const formRef = useRef(null);
  // Form hooks
  const [form] = Form.useForm();

  // router hooks
  const params = useParams();

  // FETCH DATA
  // Construct a useQuery hook that will fetch the country data
  // using the getCountryListApi function. Follow the notes example

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

  //   useEffect(() => {
  //     handleSetFieldValue();
  //   }, [employee]);

  // MUTATIONS
  // Update Employee Mutation
  const createEducationMutation = useCreateEducationMutation();
  const savePersonalInformationHandler = (education: EducationCreateData) => {
    const employeeId = parseInt(params.employeeId);
    education['employee'] = employeeId;
    console.log('education: ', education)
    createEducationMutation.mutate({data: education});
  };

  // FORM Functions
  //   const handleSetFieldValue = () => {
  //     form.setFieldsValue({
  //       first_name: employee?.first_name,
  //       middle_name: employee?.middle_name,
  //       last_name: employee?.last_name,
  //       preferred_name: employee?.preferred_name,
  //       gender: employee?.gender,
  //       date_of_birth: employee?.date_of_birth,
  //       marital_status: employee?.marital_status,
  //       nationality: employee?.nationality,
  //       social_security_number: employee?.social_security_number,
  //       national_identification_number: employee?.national_identification_number,
  //       tax_identification_number: employee?.tax_identification_number,
  //     });
  //   };

  const awardOptions = () => {
    return educationAwards?.map((educationAward: any) => ({
      value: educationAward.id,
      label: educationAward.education_award_name,
    }));
  };

  // Modal functions
  const handleOk = () => {
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
        <Card className='bg-gray-50'>
        <Form
        //   layout="vertical"
          ref={formRef}
          name="education-create-form"
          form={form}
          onFinish={savePersonalInformationHandler}
          labelAlign='left'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        //   className="flex flex-wrap"
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
            rules={[
              { required: true, message: 'Please input major!' },
            ]}
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

export default EducationCreateModal;
