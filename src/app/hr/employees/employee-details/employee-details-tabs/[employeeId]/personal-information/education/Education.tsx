import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
interface EducationData {
  key: string;
  institution_name: string;
  award: string;
  major: string;
  start_date: string;
  end_date: string;
  score: string;
}

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
  },
  {
    title: 'Score',
    key: 'score',
    dataIndex: 'score',
  },
];

const data: EducationData[] = [
  {
    key: '1',
    institution_name: 'University of Science and Technology',
    award: 'Bachelor of Computer Engineering',
    major: 'Hardware Engineering',
    start_date: 'May 24, 2022',
    end_date: 'May 24, 2023',
    score: '4.9',
  },
  {
    key: '1',
    institution_name: 'Main University of Science',
    award: 'Aritificial Intelligence',
    major: 'AI',
    start_date: 'May 24, 2022',
    end_date: 'May 24, 2023',
    score: '4.5',
  },
];

const Education = () => {
  return (
    <div className="flex flex-col">
      <Button type="primary" className="self-end mb-2" icon={<PlusCircleOutlined />}>
        Add
      </Button>
      
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Education;
