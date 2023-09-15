import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card, InputNumber } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import {
  EmergencyContactCreateData,
  EmergencyContactFormProps,
  EmergencyContactUpdateData,
  RelationshipListData,
} from './types';
import { getRelationshipListApi } from './api';
import { CountryListData } from '@/app/api/country-types';
import { getCountryListApi } from '@/app/api/country-api';
import { useCreateEmergencyContactMutation, useUpdateEmergencyContactMutation } from './mutations';

const EmergencyContactCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  emergencyContactData,
}: EmergencyContactFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: relationshipList,
    error: errorRelationshipList,
    isFetching: isFetchingRelationshipList,
    isLoading: isLoadingRelationshipList,
    status: statusRelationshipList,
  } = useQuery<RelationshipListData[]>({
    queryKey: ['relationship-list'],
    queryFn: () => getRelationshipListApi(),
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

  useEffect(() => {
    if (emergencyContactData) {
      handleSetFieldValue();
    }
  }, [emergencyContactData]);

  // MUTATIONS
  const createEmergencyContactMutation = useCreateEmergencyContactMutation();
  const updateEmergencyContactMutation = useUpdateEmergencyContactMutation();

  const createEmergencyContact = (_emergencyContact: EmergencyContactCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _emergencyContact['employee'] = employeeId;
    createEmergencyContactMutation.mutate({ data: _emergencyContact });
  };

  const updateEmergencyContact = (_emergencyContact: EmergencyContactUpdateData) => {
    _emergencyContact['employee'] = emergencyContactData?.employee?.id; 
    updateEmergencyContactMutation.mutate({ data: _emergencyContact, id: emergencyContactData?.id });
  };

  const saveEmergencyContactHandler = (
    _emergencyContact: EmergencyContactCreateData | EmergencyContactUpdateData
  ) => {
    if (Object.keys(emergencyContactData).length) {
      updateEmergencyContact(_emergencyContact);
    } else {
      createEmergencyContact(_emergencyContact);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      name: emergencyContactData?.name,
      relationship: emergencyContactData?.relationship?.id,
      mobile_phone: emergencyContactData?.mobile_phone,
      home_phone: emergencyContactData?.home_phone,
      work_phone: emergencyContactData?.work_phone,
      home_email: emergencyContactData?.home_email,
      work_email: emergencyContactData?.work_email,
      address: emergencyContactData?.address,
      city: emergencyContactData?.city,
      province: emergencyContactData?.province,
      nationality: emergencyContactData?.nationality?.id
    });
  };

  const relationshipOptions = () => {
    return relationshipList?.map((relationship: RelationshipListData) => ({
      value: relationship.id,
      label: relationship.relationship_name
    }));
  };

  const countryOptions = () => {
    return countryList?.map((country: CountryListData) => ({
      value: country.id,
      label: country.country_name
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (createEmergencyContactMutation.isSuccess || updateEmergencyContactMutation.isSuccess) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add EmergencyContact"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createEmergencyContactMutation.isLoading || updateEmergencyContactMutation.isLoading}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="emergency-contact-create-update-form"
            form={formInstance}
            onFinish={saveEmergencyContactHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Full name"
              name="name"
              rules={[
                { required: true, message: 'Please input Full name!' },
              ]}
            >
              <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Relationship" name="relationship">
              <Select
                placeholder="Select"
                className="w-full"
                options={relationshipOptions()}
              />
            </Form.Item>
            <Form.Item label="Mobile Phone" name="mobile_phone">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Home Phone" name="home_phone">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Work Phone" name="work_phone">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Home Email" name="work_email">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Work Email" name="home_email">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Address" name="address">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="City" name="city">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Province" name="province">
                <Input className='w-full' />
            </Form.Item>

            <Form.Item label="Nationality" name="nationality">
              <Select
                placeholder="Select"
                className="w-full"
                options={countryOptions()}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default EmergencyContactCreateUpdateModal;
