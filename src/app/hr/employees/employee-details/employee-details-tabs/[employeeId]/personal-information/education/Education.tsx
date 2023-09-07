import React, { useState } from 'react';
import { Button, Divider, Form, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getEducationListApi } from './api';
import { EducationListData, EducationUpdateData } from './types';
import * as dayjs from 'dayjs';
import EducationCreateUpdateModal from './EducationCreateUpdateModal';

const createColumns = (
  onModalOpen: (education_item: EducationListData) => void
): ColumnsType<EducationListData> => [
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
    render: (start_date: string) => (
      <span>{dayjs(start_date).format('MMM D, YYYY')}</span>
    ),
  },
  {
    title: 'End Date',
    key: 'end_date',
    dataIndex: 'end_date',
    render: (end_date: string) => (
      <span>{dayjs(end_date).format('MMM D, YYYY')}</span>
    ),
  },
  {
    title: 'Score',
    key: 'score',
    dataIndex: 'score',
  },
  {
    title: 'Action',
    render: (education) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(education)}
        />
        <Divider type="vertical" />
        <DeleteTwoTone className="cursor-pointer" />
      </span>
    ),
  },
];

const Education = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState<EducationListData>(
    {} as EducationListData
  );
  const [educationFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: educations,
    error: errorEducations,
    isFetching: isFetchingEducations,
    isLoading: isLoadingEducations,
    status: statusEducations,
  } = useQuery<EducationListData[]>({
    queryKey: ['educations', params.employeeId],
    queryFn: () => getEducationListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setEducationToEdit({} as EducationListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_education: EducationListData) => {
    setEducationToEdit(_education);
    setIsModalOpen(true);
  };

  const columns = createColumns(onModalEditOpenHandler);

  return (
    <div className="flex flex-col">
      <EducationCreateUpdateModal
        formInstance={educationFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        educationData={educationToEdit}
      />
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      <Table columns={columns} dataSource={educations} pagination={false} />
    </div>
  );
};

export default Education;
