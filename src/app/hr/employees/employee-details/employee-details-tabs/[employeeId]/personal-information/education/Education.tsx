import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getEducationsApi } from './api';
import { EducationData } from './types';
import * as dayjs from 'dayjs'


const columns: ColumnsType<EducationData> = [
  {
    title: 'Institution',
    dataIndex: 'institution_name',
    key: 'institution_name',
  },
  {
    title: 'Award',
    dataIndex: 'award',
    key: 'award',
    render: (award: any) => <span>{award.education_award_name}</span>,
  },
  {
    title: 'Major',
    dataIndex: 'major',
    key: 'major',
  },
  {
    title: 'Start Date',
    key: 'start_date',
    dataIndex: 'start_date',
    render: (start_date: string) => <span>{dayjs(start_date).format('MMM D, YYYY')}</span>,
  },
  {
    title: 'Score',
    key: 'score',
    dataIndex: 'score',
  },
];


const Education = () => {
  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: educations,
    error: errorEducations,
    isFetching: isFetchingEducations,
    isLoading: isLoadingEducations,
    status: statusEducations,
  } = useQuery<EducationData[]>({
    queryKey: ['educations', params.employeeId],
    queryFn: () => getEducationsApi(parseInt(params.employeeId)),
  });


  return (
    <div className="flex flex-col">
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
      >
        Add
      </Button>

      <Table columns={columns} dataSource={educations} pagination={false} />
    </div>
  );
};

export default Education;
