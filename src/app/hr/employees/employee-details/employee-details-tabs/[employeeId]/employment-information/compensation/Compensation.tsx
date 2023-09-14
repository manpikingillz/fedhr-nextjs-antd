import React, { useState } from 'react';
import { Button, Divider, Empty, Form, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getCompensationListApi } from './api';
import { DepartmentListData, DivisionListData, CompensationListData, JobListData, LocationListData, CurrencyListData, ChangeReasonListData } from './types';
import * as dayjs from 'dayjs';
import { useDeleteCompensationMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import CompensationCreateUpdateModal from './CompensationCreateUpdateModal';

const createColumns = (
  onModalOpen?: (compensation_item: CompensationListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<CompensationListData> => [
  {
    title: 'Effective Date',
    dataIndex: 'effective_date',
    key: 'effective_date',
    render: (effective_date: string) => (
      <span>{effective_date ? dayjs(effective_date).format('MMM D, YYYY') : null}</span>
    ),
  },
  {
    title: 'Pay Type',
    dataIndex: 'pay_type',
    key: 'pay_type'
  },
  {
    title: 'Pay Rate',
    dataIndex: 'pay_rate',
    key: 'pay_rate'
  },
  {
    title: 'Pay Rate Currency',
    dataIndex: 'pay_rate_currency',
    key: 'pay_rate_currency',
    render: (pay_rate_currency: CurrencyListData) => <span>{pay_rate_currency.currency_code}</span>,
  },
  {
    title: 'Pay Rate Period',
    dataIndex: 'pay_rate_period',
    key: 'pay_rate_period',
  },
  {
    title: 'Pay Schedule',
    dataIndex: 'pay_schedule',
    key: 'pay_schedule',
  },
  {
    title: 'Overtime Status',
    dataIndex: 'overtime_status',
    key: 'overtime_status',
  },
  {
    title: 'Change Reason',
    dataIndex: 'change_reason',
    key: 'change_reason',
    render: (change_reason: ChangeReasonListData) => <span>{change_reason.change_reason_name}</span>,
  },
  {
    title: 'Payment Method',
    dataIndex: 'payment_method',
    key: 'payment_method',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Action',
    render: (compensation) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(compensation)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(compensation.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const CompensationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compensationToEdit, setCompensationToEdit] = useState<CompensationListData>(
    {} as CompensationListData
  );
  const [compensationFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: compensationList,
    error: errorCompensationList,
    isFetching: isFetchingCompensationList,
    isLoading: isLoadingCompensationList,
    status: statusCompensationList,
  } = useQuery<CompensationListData[]>({
    queryKey: ['compensation-list', params.employeeId],
    queryFn: () => getCompensationListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setCompensationToEdit({} as CompensationListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_compensation: CompensationListData) => {
    setCompensationToEdit(_compensation);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteCompensationMutation = useDeleteCompensationMutation();
  const onDeleteHandler = (id: number) => {
    deleteCompensationMutation.mutate(id);
    queryClient.refetchQueries(['compensation-list']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      {isModalOpen &&
      <CompensationCreateUpdateModal
        formInstance={compensationFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        compensationData={compensationToEdit}
      />}
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorCompensationList ? (
        <ErrorMessage error={errorCompensationList} />
      ) : (
        <Table
          columns={columns}
          dataSource={compensationList}
          pagination={false}
          loading={isFetchingCompensationList || isLoadingCompensationList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default CompensationList;
