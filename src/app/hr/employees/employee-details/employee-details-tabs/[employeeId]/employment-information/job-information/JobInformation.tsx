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
import { getJobInformationListApi } from './api';
import { DepartmentListData, DivisionListData, JobInformationListData, JobListData, LocationListData } from './types';
import * as dayjs from 'dayjs';
import { useDeleteJobInformationMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import JobInformationCreateUpdateModal from './JobInformationCreateUpdateModal';

const createColumns = (
  onModalOpen?: (employment_status_item: JobInformationListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<JobInformationListData> => [
  {
    title: 'Effective Date',
    dataIndex: 'effective_date',
    key: 'effective_date',
    render: (effective_date: string) => (
      <span>{effective_date ? dayjs(effective_date).format('MMM D, YYYY') : null}</span>
    ),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    render: (location: LocationListData) => <span>{location.location_name}</span>,
  },
  {
    title: 'Division',
    dataIndex: 'division',
    key: 'division',
    render: (division: DivisionListData) => <span>{division.division_name}</span>,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (department: DepartmentListData) => <span>{department.department_name}</span>,
  },
  {
    title: 'Job',
    dataIndex: 'job',
    key: 'job',
    render: (job: JobListData) => <span>{job.job_title_name}</span>,
  },
  {
    title: 'Action',
    render: (job_information) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(job_information)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(job_information.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const JobInformationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobInformationToEdit, setJobInformationToEdit] = useState<JobInformationListData>(
    {} as JobInformationListData
  );
  const [jobInformationFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: jobInformationList,
    error: errorJobInformationList,
    isFetching: isFetchingJobInformationList,
    isLoading: isLoadingJobInformationList,
    status: statusJobInformationList,
  } = useQuery<JobInformationListData[]>({
    queryKey: ['job-information-list', params.employeeId],
    queryFn: () => getJobInformationListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setJobInformationToEdit({} as JobInformationListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_jobInformation: JobInformationListData) => {
    setJobInformationToEdit(_jobInformation);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteJobInformationMutation = useDeleteJobInformationMutation();
  const onDeleteHandler = (id: number) => {
    deleteJobInformationMutation.mutate(id);
    queryClient.refetchQueries(['job-information-list']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      {isModalOpen &&
      <JobInformationCreateUpdateModal
        formInstance={jobInformationFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        jobInformationData={jobInformationToEdit}
      />}
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorJobInformationList ? (
        <ErrorMessage error={errorJobInformationList} />
      ) : (
        <Table
          columns={columns}
          dataSource={jobInformationList}
          pagination={false}
          loading={isFetchingJobInformationList || isLoadingJobInformationList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default JobInformationList;
