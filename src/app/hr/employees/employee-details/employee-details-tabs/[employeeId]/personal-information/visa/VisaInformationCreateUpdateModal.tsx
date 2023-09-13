import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';

import {
  VisaInformationCreateData,
  VisaInformationFormProps,
  VisaInformationUpdateData,
  VisaListData,
} from './types';
import {
  useCreateVisaInformationMutation,
  useUpdateVisaInformationMutation,
} from './mutations';
import { CountryListData } from '@/app/api/country-types';
import { getCountryListApi } from '@/app/api/country-api';
import { getVisasListApi } from './api';

const VisaInformationCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  visaInformationData,
}: VisaInformationFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: visas,
    error: errorVisas,
    isFetching: isFetchingVisas,
    isLoading: isLoadingVisas,
    status: statusVisas,
  } = useQuery<VisaListData[]>({
    queryKey: ['visas-list'],
    queryFn: () => getVisasListApi(),
  });

  const {
    data: countries,
    error: errorCountries,
    isFetching: isFetchingCountries,
    isLoading: isLoadingCountries,
    status: statusCountries,
  } = useQuery<CountryListData[]>({
    queryKey: ['country-list'],
    queryFn: () => getCountryListApi(),
  });

  useEffect(() => {
    if (visaInformationData) {
      handleSetFieldValue();
    }
  }, [visaInformationData]);

  // MUTATIONS
  // Update Employee Mutation
  const createVisaInformationMutation = useCreateVisaInformationMutation();
  const updateVisaInformationMutation = useUpdateVisaInformationMutation();

  const createVisaInformation = (_visaInformation: EducationCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _visaInformation['employee'] = employeeId;

    _visaInformation['date'] = dayjs(_visaInformation['date']).format(
      'YYYY-MM-DD'
    );

    _visaInformation['issued_date'] = dayjs(
      _visaInformation['issued_date']
    ).format('YYYY-MM-DD');

    _visaInformation['expiration_date'] = dayjs(
      _visaInformation['expiration_date']
    ).format('YYYY-MM-DD');

    createVisaInformationMutation.mutate({ data: _visaInformation });
  };

  const updateVisaInformation = (
    _visaInformation: VisaInformationUpdateData
  ) => {
    _visaInformation['employee'] = visaInformationData?.employee?.id;
    updateVisaInformationMutation.mutate({
      data: _visaInformation,
      id: visaInformationData?.id,
    });
  };

  const saveVisaInformationHandler = (
    _visaInformation: VisaInformationCreateData | VisaInformationUpdateData
  ) => {
    if (Object.keys(visaInformationData).length) {
      updateVisaInformation(_visaInformation);
    } else {
      createVisaInformation(_visaInformation);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      date: visaInformationData?.date,
      visa: visaInformationData?.visa?.id,
      issued_date: visaInformationData?.issued_date,
      issuing_country: visaInformationData?.issuing_country,
      expiration_date: visaInformationData?.expiration_date,
      note: visaInformationData?.note,
    });
  };

  const visaOptions = () => {
    return visas?.map((visa: VisaListData) => ({
      value: visa.id,
      label: visa.visa_name,
    }));
  };

  const countryOptions = () => {
    return countries?.map((country: CountryListData) => ({
      value: country.id,
      label: country.country_name,
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (
      createVisaInformationMutation.isSuccess ||
      updateVisaInformationMutation.isSuccess
    ) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Visa Information"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={
          createVisaInformationMutation.isLoading ||
          updateVisaInformationMutation.isLoading
        }
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="visa-information-create-update-form"
            form={formInstance}
            onFinish={saveVisaInformationHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Date" name="date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Visa" name="visa">
              <Select
                placeholder="Select"
                className="w-full"
                options={visaOptions()}
              />
            </Form.Item>
            <Form.Item label="Issued Date" name="issued_date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Issuing Country" name="issuing_country">
              <Select
                placeholder="Select"
                className="w-full"
                options={countryOptions()}
              />
            </Form.Item>
            <Form.Item label="Expiration Date" name="expiration_date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Note" name="note">
              <Input placeholder="Note" />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default VisaInformationCreateUpdateModal;
