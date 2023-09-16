import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card, InputNumber } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';

import {
  TrainingCreateData,
  TrainingFormProps,
  TrainingUpdateData,
  CourseListData,
} from './types';
import { getCourseListApi } from './api';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from './mutations';

const TrainingCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  trainingData,
}: TrainingFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: courseList,
    error: errorCourseList,
    isFetching: isFetchingCourseList,
    isLoading: isLoadingCourseList,
    status: statusCourseList,
  } = useQuery<CourseListData[]>({
    queryKey: ['course-list'],
    queryFn: () => getCourseListApi(),
  });

  useEffect(() => {
    if (trainingData) {
      handleSetFieldValue();
    }
  }, [trainingData]);

  // MUTATIONS
  const createTrainingMutation = useCreateTrainingMutation();
  const updateTrainingMutation = useUpdateTrainingMutation();

  const createTraining = (_training: TrainingCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _training['employee'] = employeeId;
    _training['completed'] = _training['completed'] ? dayjs(_training['completed']).format('YYYY-MM-DD') : null;
    createTrainingMutation.mutate({ data: _training });
  };

  const updateTraining = (_training: TrainingUpdateData) => {
    _training['employee'] = trainingData?.employee?.id;
    _training['completed'] = _training['completed'] ? dayjs(_training['completed']).format('YYYY-MM-DD') : null;
    updateTrainingMutation.mutate({ data: _training, id: trainingData?.id });
  };

  const saveTrainingHandler = (
    _training: TrainingCreateData | TrainingUpdateData
  ) => {
    if (Object.keys(trainingData).length) {
      updateTraining(_training);
    } else {
      createTraining(_training);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      course: trainingData?.course?.id,
      completed: trainingData?.completed ? dayjs(trainingData?.completed) : null,
      cost: trainingData?.cost,
      credits: trainingData?.credits,
      hours: trainingData?.hours,
      instructor: trainingData?.instructor,
      note: trainingData?.note
    });
  };

  const courseOptions = () => {
    return courseList?.map((course: CourseListData) => ({
      value: course.id,
      label: course.course_name
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (createTrainingMutation.isSuccess || updateTrainingMutation.isSuccess) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Training"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createTrainingMutation.isLoading || updateTrainingMutation.isLoading}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="training-create-update-form"
            form={formInstance}
            onFinish={saveTrainingHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Course" name="course">
              <Select
                placeholder="Select"
                className="w-full"
                options={courseOptions()}
              />
            </Form.Item>
            <Form.Item label="Completed" name="completed">
                <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item label="Cost" name="cost">
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item label="Credits" name="credits">
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item label="Hours" name="hours">
                <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item label="Instructor" name="instructor">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Note" name="note">
                <Input.TextArea className='w-full' />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default TrainingCreateUpdateModal;
