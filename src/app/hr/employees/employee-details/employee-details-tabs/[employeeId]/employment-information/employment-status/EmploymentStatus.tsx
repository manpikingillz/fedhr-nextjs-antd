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
import { getEmploymentStatusListApi } from './api';
import { EmploymentStatusListData } from './types';
import * as dayjs from 'dayjs';
import { useDeleteEmploymentStatusMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import EmploymentStatusCreateUpdateModal from './EmploymentStatusCreateUpdateModal';

const createColumns = (
  onModalOpen?: (employment_status_item: EmploymentStatusListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<EmploymentStatusListData> => [
  {
    title: 'Effective Date',
    dataIndex: 'effective_date',
    key: 'effective_date',
    render: (effective_date: string) => (
      <span>{effective_date ? dayjs(effective_date).format('MMM D, YYYY') : null}</span>
    ),
  },
  {
    title: 'Employment Status',
    dataIndex: 'employment_status_type',
    key: 'employment_status_type',
    render: (employment_status_type: any) => <span>{employment_status_type.employment_status_type_name}</span>,
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Action',
    render: (employment_status) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(employment_status)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(employment_status.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const EmploymentStatusList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employmentStatusToEdit, setEmploymentStatusToEdit] = useState<EmploymentStatusListData>(
    {} as EmploymentStatusListData
  );
  const [employmentStatusFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: employmentStatusList,
    error: errorEmploymentStatusList,
    isFetching: isFetchingEmploymentStatusList,
    isLoading: isLoadingEmploymentStatusList,
    status: statusEmploymentStatusList,
  } = useQuery<EmploymentStatusListData[]>({
    queryKey: ['employment-status-list', params.employeeId],
    queryFn: () => getEmploymentStatusListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setEmploymentStatusToEdit({} as EmploymentStatusListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_employmentStatus: EmploymentStatusListData) => {
    setEmploymentStatusToEdit(_employmentStatus);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteEmploymentstatusMutation = useDeleteEmploymentStatusMutation();
  const onDeleteHandler = (id: number) => {
    deleteEmploymentstatusMutation.mutate(id);
    queryClient.refetchQueries(['employment-status-list']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      {isModalOpen &&
      <EmploymentStatusCreateUpdateModal
        formInstance={employmentStatusFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        employmentStatusData={employmentStatusToEdit}
      />}
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorEmploymentStatusList ? (
        <ErrorMessage error={errorEmploymentStatusList} />
      ) : (
        <Table
          columns={columns}
          dataSource={employmentStatusList}
          pagination={false}
          loading={isFetchingEmploymentStatusList || isLoadingEmploymentStatusList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default EmploymentStatusList;
