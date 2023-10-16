'use client'

import React from 'react';
import { Button, Divider, Empty, Form, Menu, Popconfirm, Select, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  UserOutlined
} from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage } from '@/app/error/errorPage';

import { useRouter } from 'next/navigation';
import { JobOpeningListData } from '@/app/types/jop-opening-types';
import * as dayjs from 'dayjs';
import { getJobOpeningListApi } from '@/app/api/job-opening-api';
import { useDeleteJobOpeningMutation } from '@/app/mutations/job-opening-mutations';
import Link from 'next/link';


const createColumns = (
  onEdit?: (jobOpeningItem: JobOpeningListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<JobOpeningListData> => [
  {
    title: 'Candidates',
    dataIndex: 'candidates',
    key: 'candidates',
    render: () => <>
      <div>
        <div>
          <span className="mdi mdi-account-circle text-lg mr-1 text-blue-500"></span>
          <span className='text-lg text-blue-500'>1</span>
          <p className='text-blue-500'>1 NEW</p>
        </div>
      </div>
    </>,
  },
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    render: (job_title) => <Link href="/hr/recruitment/job-opening-details">{job_title}</Link>,
  },
  {
    title: 'Hiring Lead',
    dataIndex: 'hiring_lead',
    key: 'hiring_lead',
    render: (hiring_lead) => <span>{hiring_lead && (hiring_lead.first_name + ' ' + hiring_lead.last_name)}</span>,
  },
  {
    title: 'Created On',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at) => <span>{created_at && dayjs(created_at).format('MMM DD, YYYY')}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'job_status',
    key: 'job_status',
  },
  {
    title: 'Action',
    className: 'w-28',
    render: (jobOpening) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onEdit(jobOpening)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(jobOpening.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
        <Divider type="vertical" />
        <span className='mdi mdi-content-copy text-blue-500 cursor-pointer'></span>
      </span>
    ),
  },
];

const JobOpeningList = () => {
  const router = useRouter();


  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: jobOpeningList,
    error: errorJobOpeningList,
    isFetching: isFetchingJobOpeningList,
    isLoading: isLoadingJobOpeningList,
    status: statusJobOpeningList,
  } = useQuery<JobOpeningListData[]>({
    queryKey: ['job-opening-list'],
    queryFn: () => getJobOpeningListApi(),
  });

  const queryClient = useQueryClient();

  const deleteJobOpeningMutation = useDeleteJobOpeningMutation();
  const onDeleteHandler = (id: number) => {
    deleteJobOpeningMutation.mutate(id);
    queryClient.refetchQueries(['job-opening-list']);
  };

  const onEditHandler = (jobOpening: JobOpeningListData) => {
    router.push(`/hr/recruitment/update_job_opening/${jobOpening.id}`);
  }

  const columns = createColumns(onEditHandler, onDeleteHandler);

  const onAddJobOpeningHandler = () => {
    router.push('/hr/recruitment/create_job_opening/');
  };

  const jobOpeningStatusChangeHandler = (value) => {
    console.log('Status changed: ', value)
  }

  const jobOpeningOptions = [
    { value: 'Draft & Open', label: 'Draft & Open' },
    { value: 'All', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'Draft', label: 'Draft' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Filled', label: 'Filled' },
    { value: 'Canceled', label: 'Canceled' }
  ];

  return (
    <div className="flex flex-col">
      <div className='flex justify-between gap-x-2'>
        <Button
          type="default"
          className="self-end mb-2 text-blue-500 border-blue-500"
          icon={<PlusCircleOutlined />}
          onClick={onAddJobOpeningHandler}
        >
          Add Job Opening
        </Button>
        <div className='flex items-center gap-x-2'>
          <span className='text-gray-800 '>5 of 25 open .</span>
          <label className=' text-gray-800'>Show</label>
          <Select
            defaultValue="Draft & Open"
            style={{ width: 200 }}
            onChange={jobOpeningStatusChangeHandler}
            options={jobOpeningOptions}
          />
          <Tooltip title="Download job postings">
            <Button icon={<span className='mdi mdi-arrow-down-box text-2xl text-zinc-600'></span>} className='flex items-center justify-center'/>
          </Tooltip>
        </div>
      </div>

      {errorJobOpeningList ? (
        <ErrorMessage error={errorJobOpeningList} />
      ) : (
        <Table
          columns={columns}
          dataSource={jobOpeningList}
          pagination={false}
          loading={isFetchingJobOpeningList || isLoadingJobOpeningList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default JobOpeningList;
