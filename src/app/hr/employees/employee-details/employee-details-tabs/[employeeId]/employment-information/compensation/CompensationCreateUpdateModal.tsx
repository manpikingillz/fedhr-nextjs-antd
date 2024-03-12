import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card, InputNumber } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';

import {
  DepartmentListData,
  DivisionListData,
  CompensationCreateData,
  CompensationFormProps,
  CompensationUpdateData,
  JobListData,
  LocationListData,
  CurrencyListData,
  ChangeReasonListData,
} from './types';
import { getChangeReasonListApi, getCurrencyListApi, getDepartmentListApi, getDivisionListApi, getJobListApi, getLocationListApi } from './api';
import {
  useCreateCompensationMutation,
  useUpdateCompensationMutation,
} from './mutations';

const CompensationCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  compensationData,
}: CompensationFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: currencyList,
    error: errorCurrencyList,
    isFetching: isFetchingCurrencyList,
    isLoading: isLoadingCurrencyList,
    status: statusCurrencyList,
  } = useQuery<CurrencyListData[]>({
    queryKey: ['currency-list'],
    queryFn: () => getCurrencyListApi(),
  });

  const {
    data: changeReasonList,
    error: errorChangeReasonList,
    isFetching: isFetchingChangeReasonList,
    isLoading: isLoadingChangeReasonList,
    status: statusChangeReasonList,
  } = useQuery<ChangeReasonListData[]>({
    queryKey: ['change-reason-list'],
    queryFn: () => getChangeReasonListApi(),
  });



  useEffect(() => {
    if (compensationData) {
      handleSetFieldValue();
    }
  }, [compensationData]);

  // MUTATIONS
  const createCompensationMutation = useCreateCompensationMutation();
  const updateCompensationMutation = useUpdateCompensationMutation();

  const createCompensation = (_compensation: CompensationCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _compensation['employee'] = employeeId;
    _compensation['effective_date'] = dayjs(_compensation['effective_date']).format('YYYY-MM-DD');

    createCompensationMutation.mutate({ data: _compensation });
  };

  const updateCompensation = (_compensation: CompensationUpdateData) => {
    _compensation['employee'] = compensationData?.employee?.id;
    _compensation['effective_date'] = _compensation['effective_date'] ? dayjs(_compensation['effective_date']).format('YYYY-MM-DD'): null;
  
    updateCompensationMutation.mutate({ data: _compensation, id: compensationData?.id });
  };

  const saveCompensationHandler = (
    _compensation: CompensationCreateData | CompensationUpdateData
  ) => {
    if (Object.keys(compensationData).length) {
      updateCompensation(_compensation);
    } else {
      createCompensation(_compensation);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      effective_date: compensationData?.effective_date ? dayjs(compensationData?.effective_date) : null,
      pay_type: compensationData?.pay_type,
      pay_rate: compensationData?.pay_rate,
      pay_rate_currency: compensationData?.pay_rate_currency?.id,
      pay_rate_period: compensationData?.pay_rate_period,
      pay_schedule: compensationData?.pay_schedule,
      overtime_status: compensationData?.overtime_status,
      change_reason: compensationData?.change_reason?.id,
      payment_method: compensationData?.payment_method,
      comment: compensationData?.comment
    });
  };

  const currencyOptions = () => {
    return currencyList?.map((currency: CurrencyListData) => ({
      value: currency.id,
      label: currency.currency_code + ' - ' + currency.currency_name,
    }));
  };

  const changeReasonOptions = () => {
    return changeReasonList?.map((changeReason: ChangeReasonListData) => ({
      value: changeReason.id,
      label: changeReason.change_reason_name,
    }));
  };

  const payTypeOptions = () => {
    return [
      {value: 'SALARY', label: 'Salary'},
      {value: 'HOURLY', label: 'Hourl'},
      {value: 'COMMISSION_ONLY', label: 'Commission Only'}
    ]
  };

  const payRatePeriodOptions = () => {
    return [
      {value: 'DAY', label: 'Day'},
      {value: 'WEEK', label: 'Week'},
      {value: 'MONTH', label: 'Month'},
      {value: 'QUARTER', label: 'Quarter'},
      {value: 'YEAR', label: 'Year'},
      {value: 'PAY_PERIOD', label: 'Pay Period'},
      {value: 'PIECE', label: 'Piece'}
    ]
  };

  const payScheduleOptions = () => {
    return [
      {value: 'TWICE_A_MONTH', label: 'Twice a month'},
      {value: 'EVERY_OTHER_WEEK', label: 'Every other week'}
    ]
  };

  const overtimeStatusOptions = () => {
    return [
      {value: 'EXEMPT', label: 'Exempt'},
      {value: 'NON_EXEMPT', label: 'Non Exempt'}
    ]
  };

  const paymentMethodOptions = () => {
    return [
      {value: 'PAYCHECK', label: 'Paycheck'},
      {value: 'DIRECT_DEPOSIT', label: 'Direct Deposit'},
      {value: 'CASH', label: 'Cash'}
    ]
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (createCompensationMutation.isSuccess || updateCompensationMutation.isSuccess) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Compensation"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createCompensationMutation.isLoading || updateCompensationMutation.isLoading}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="compensation-create-update-form"
            form={formInstance}
            onFinish={saveCompensationHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Effective Date"
              name="effective_date"
              rules={[
                { required: true, message: 'Please input Effective Date!' },
              ]}
            >
              <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item label="Pay Type" name="pay_type">
              <Select
                placeholder="Select"
                className="w-full"
                options={payTypeOptions()}
              />
            </Form.Item>
            <Form.Item label="Pay Rate" name="pay_rate">
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item label="Pay Rate Currency" name="pay_rate_currency">
              <Select
                placeholder="Select"
                className="w-full"
                options={currencyOptions()}
              />
            </Form.Item>
            <Form.Item label="Pay Rate Period" name="pay_rate_period">
              <Select
                placeholder="Select"
                className="w-full"
                options={payRatePeriodOptions()}
              />
            </Form.Item>
            <Form.Item label="Pay Schedule" name="pay_schedule">
              <Select
                placeholder="Select"
                className="w-full"
                options={payScheduleOptions()}
              />
            </Form.Item>
            <Form.Item label="Overtime Status" name="overtime_status">
              <Select
                placeholder="Select"
                className="w-full"
                options={overtimeStatusOptions()}
              />
            </Form.Item>
            <Form.Item label="Change Reason" name="change_reason">
              <Select
                placeholder="Select"
                className="w-full"
                options={changeReasonOptions()}
              />
            </Form.Item>
            <Form.Item label="Payment Method" name="payment_method">
              <Select
                placeholder="Select"
                className="w-full"
                options={paymentMethodOptions()}
              />
            </Form.Item>
            <Form.Item label="Comment" name="comment">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default CompensationCreateUpdateModal;
