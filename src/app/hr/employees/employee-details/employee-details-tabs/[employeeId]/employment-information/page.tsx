'use client';

import {
  SettingOutlined,
  CaretRightOutlined,
  ContactsTwoTone,
  CloseCircleOutlined,
} from '@ant-design/icons';
import React, { CSSProperties, use, useEffect, useState } from 'react';
import type { CollapseProps } from 'antd';
import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Skeleton,
  Typography,
  theme,
} from 'antd';
import EmploymentStatusList from './employment-status/EmploymentStatus';
import JobInformationList from './job-information/JobInformation';
import CompensationList from './compensation/Compensation';
import DirectReports from './direct-reports/DirectReports';
import { useUpdateEmployeeMutation } from '../personal-information/mutations';
import {
  EmployeeDetailData,
  EmployeeUpdateData,
} from '../personal-information/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { getEmployeeApi } from '../personal-information/api';
import { ErrorMessage } from '@/app/error/errorPage';

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  panelStyle
) => [
  {
    key: '1',
    label: <b>Employment Status</b>,
    children: (
      <div>
        <EmploymentStatusList />
      </div>
    ),
    style: panelStyle,
    // extra: genExtra()
  },
  {
    key: '2',
    label: <b>Job Information</b>,
    children: (
      <div>
        <JobInformationList />
      </div>
    ),
    // extra: genExtra(),
    style: panelStyle,
  },
  {
    key: '3',
    label: <b>Compensation</b>,
    children: (
      <div>
        <CompensationList />
      </div>
    ),
    // extra: genExtra(),
    style: panelStyle,
  },
  {
    key: '4',
    label: <b>Direct Reports</b>,
    children: (
      <div>
        {' '}
        <DirectReports />
      </div>
    ),
    // extra: genExtra(),
    style: panelStyle,
  },
];

function EmploymentInformation() {
  const { token } = theme.useToken();
  const params = useParams();

  const [formInstance] = Form.useForm();
  const [isButtonHidden, setIsButtonHidden] = useState(true);
  // FETCH DATA
  const {
    data: employee,
    error: errorEmployee,
    isFetching: isFetchingEmployee,
    isLoading: isLoadingEmployee,
    status: statusEmployee,
    refetch,
  } = useQuery<EmployeeDetailData>({
    queryKey: ['employee', params.employeeId],
    queryFn: () => getEmployeeApi(parseInt(params.employeeId)),
  });

  const queryClient = useQueryClient();
  const updateEmployeeMutation = useUpdateEmployeeMutation();

  const saveEmployeeHandler = (employee: EmployeeUpdateData) => {
    const employeeId = parseInt(params.employeeId);
    employee['hire_date'] = employee['hire_date']
      ? dayjs(employee['hire_date']).format('YYYY-MM-DD')
      : null;
    updateEmployeeMutation.mutate({ data: employee, id: employeeId });
    queryClient.refetchQueries(['employee', params.employeeId]);
  };

  useEffect(() => {
    if (employee) {
      handleSetFieldValue();
    }
  });

  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      hire_date: employee?.hire_date ? dayjs(employee?.hire_date) : null,
    });
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const panelStyle: React.CSSProperties = {
    // marginBottom: 24,
    // background: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: 'none',
  };

  const onHireDateChangeHandler = () => {
    setIsButtonHidden(false);
  };

  const onCancelHandler = () => {
    setIsButtonHidden(true);
  };

  return (
    <div>
      <ContactsTwoTone className="text-2xl ml-4" />
      <Typography.Text className="text-2xl ml-4 text-blue-600">
        Employment Information{' '}
      </Typography.Text>
      <Divider className="mt-2" />
      {errorEmployee ? (
        <ErrorMessage error={errorEmployee} />
      ) : (
        <Skeleton loading={isLoadingEmployee || isFetchingEmployee} active>
          <Form
            name="employee-create-update-form"
            form={formInstance}
            onFinish={saveEmployeeHandler}
            labelAlign="left"
            className="flex"
          >
            <Form.Item
              label="Hire Date"
              name="hire_date"
              rules={[{ required: true, message: 'Please input Hire Date!' }]}
            >
              <DatePicker onChange={onHireDateChangeHandler} />
            </Form.Item>
            <div className="flex">
              <Form.Item hidden={isButtonHidden}>
                <Button htmlType="submit" type="link">
                  Save
                </Button>
              </Form.Item>
              <Form.Item hidden={isButtonHidden}>
                <Button
                  type="ghost"
                  shape="circle"
                  icon={<CloseCircleOutlined />}
                  style={{ borderRadius: '20px' }}
                  onClick={onCancelHandler}
                  hidden={isButtonHidden}
                />
              </Form.Item>
            </div>
          </Form>
        </Skeleton>
      )}
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition="start"
        items={getItems(panelStyle)}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        bordered={false}
      />
    </div>
  );
}

export default EmploymentInformation;
