import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';

import {
  EmploymentStatusCreateData,
  EmploymentStatusFormProps,
  EmploymentStatusTypeListData,
  EmploymentStatusUpdateData,
} from './types';
import { getEmploymentStatusTypeListApi } from './api';
import {
  useCreateEmploymentStatusMutation,
  useUpdateEmploymentStatusMutation,
} from './mutations';

const EmploymentStatusCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  employmentStatusData,
}: EmploymentStatusFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: employmentStatusTypes,
    error: errorEmploymentStatusTypes,
    isFetching: isFetchingEmploymentStatusTypes,
    isLoading: isLoadingEmploymentStatusTypes,
    status: statusEmploymentStatusTypes,
  } = useQuery<EmploymentStatusTypeListData[]>({
    queryKey: ['employment-status-type-list'],
    queryFn: () => getEmploymentStatusTypeListApi(),
  });

  useEffect(() => {
    if (employmentStatusData) {
      handleSetFieldValue();
    }
  }, [employmentStatusData]);

  // MUTATIONS
  // Update Employee Mutation
  const createEmploymentStatusMutation = useCreateEmploymentStatusMutation();
  const updateEmploymentStatusMutation = useUpdateEmploymentStatusMutation();

  const createEmploymentStatus = (_employmentStatus: EmploymentStatusCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _employmentStatus['employee'] = employeeId;
    _employmentStatus['effective_date'] = dayjs(_employmentStatus['effective_date']).format('YYYY-MM-DD');

    createEmploymentStatusMutation.mutate({ data: _employmentStatus });
  };

  const updateEmploymentStatus = (_employmentStatus: EmploymentStatusUpdateData) => {
    _employmentStatus['employee'] = employmentStatusData?.employee?.id;
    _employmentStatus['effective_date'] = _employmentStatus['effective_date'] ? dayjs(_employmentStatus['effective_date']).format('YYYY-MM-DD'): null;
  
    updateEmploymentStatusMutation.mutate({ data: _employmentStatus, id: employmentStatusData?.id });
  };

  const saveEmploymentStatusHandler = (
    _employmentStatus: EmploymentStatusCreateData | EmploymentStatusUpdateData
  ) => {
    if (Object.keys(employmentStatusData).length) {
      createEmploymentStatus(_employmentStatus);
    } else {
      updateEmploymentStatus(_employmentStatus);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      effective_date: employmentStatusData?.effective_date ? dayjs(employmentStatusData?.effective_date) : null,
      employment_status_type: employmentStatusData?.employment_status_type?.id,
      comment: employmentStatusData?.comment
    });
  };

  const employmentStatusTypeOptions = () => {
    return employmentStatusTypes?.map((employmentStatusType: EmploymentStatusTypeListData) => ({
      value: employmentStatusType.id,
      label: employmentStatusType.employment_status_type_name,
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (createEmploymentStatusMutation.isSuccess || updateEmploymentStatusMutation.isSuccess) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Employment Status"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createEmploymentStatusMutation.isLoading || updateEmploymentStatusMutation.isLoading}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="employment-status-create-update-form"
            form={formInstance}
            onFinish={saveEmploymentStatusHandler}
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
            <Form.Item label="Employment Status" name="employment_status_type">
              <Select
                placeholder="Select"
                className="w-full"
                options={employmentStatusTypeOptions()}
              />
            </Form.Item>
            <Form.Item label="Comment" name="comment">
              <Input placeholder="Comment" />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default EmploymentStatusCreateUpdateModal;
