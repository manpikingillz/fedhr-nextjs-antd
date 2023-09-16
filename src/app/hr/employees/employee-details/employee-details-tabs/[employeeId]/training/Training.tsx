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
import { getTrainingListApi } from './api';
import { TrainingListData, CourseListData } from './types';
import * as dayjs from 'dayjs';
import { useDeleteTrainingMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import TrainingCreateUpdateModal from './TrainingCreateUpdateModal';

const createColumns = (
  onModalOpen?: (training_item: TrainingListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<TrainingListData> => [
  {
    title: 'Course',
    dataIndex: 'course',
    key: 'course',
    render: (course: CourseListData) => <span>{course.course_name}</span>,

  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    key: 'completed',
    render: (completed) => <span>{ completed && dayjs(completed).format('MMM DD, YYYY')}</span>,
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost'
  },
  {
    title: 'Credits',
    dataIndex: 'credits',
    key: 'credits'
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours'
  },
  {
    title: 'Instructor',
    dataIndex: 'instructor',
    key: 'instructor'
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note'
  },
  {
    title: 'Action',
    render: (training) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(training)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(training.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const TrainingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainingToEdit, setTrainingToEdit] = useState<TrainingListData>(
    {} as TrainingListData
  );
  const [trainingFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: trainingList,
    error: errorTrainingList,
    isFetching: isFetchingTrainingList,
    isLoading: isLoadingTrainingList,
    status: statusTrainingList,
  } = useQuery<TrainingListData[]>({
    queryKey: ['training-list', params.employeeId],
    queryFn: () => getTrainingListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setTrainingToEdit({} as TrainingListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_training: TrainingListData) => {
    setTrainingToEdit(_training);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteTrainingMutation = useDeleteTrainingMutation();
  const onDeleteHandler = (id: number) => {
    deleteTrainingMutation.mutate(id);
    queryClient.refetchQueries(['training-list']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      {isModalOpen &&
      <TrainingCreateUpdateModal
        formInstance={trainingFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        trainingData={trainingToEdit}
      />}
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorTrainingList ? (
        <ErrorMessage error={errorTrainingList} />
      ) : (
        <Table
          columns={columns}
          dataSource={trainingList}
          pagination={false}
          loading={isFetchingTrainingList || isLoadingTrainingList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default TrainingList;
