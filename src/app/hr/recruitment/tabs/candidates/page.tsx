'use client'

import React from 'react';
import { Divider, Dropdown, MenuProps, Rate, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined, SmileOutlined, FileTextFilled, CommentOutlined, MailFilled, ToTopOutlined, DeleteOutlined} from '@ant-design/icons';

interface DataType {
  key: string;
  name: string;
  job_title: string;
  address: string;
  status: string;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <FileTextFilled />,
    label: (
      <a>
        View Resume
      </a>
    ),
  },
  {
    key: '2',
    icon: <CommentOutlined />,
    label: (
      <a>
        Add Comment
      </a>
    ),
  },
  {
    key: '3',
    icon: <MailFilled />,
    label: (
      <a>
        Send Email
      </a>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: '5',
    icon: <ToTopOutlined rotate={90}/>,
    label: (
      <a>
        Move Candidate
      </a>
    ),
  },
  {
    key: '6',
    icon: <DeleteOutlined />,
    label: (
      <a>
        Delete Candidate
      </a>
    ),
  }
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Candidate Info',
    dataIndex: 'name',
    key: 'name',
    render: (_, item) => (
     <div>
        <a>
          {item.name}
        </a>
        <p className='text-gray-500'>
          {item.address}
        </p>
      </div>
    ),
  },
  {
    title: 'Job Opening',
    dataIndex: 'job_title',
    key: 'job_title',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, item) => (
    <div>
      {item.status}
      <p className='text-gray-500'>Updated in 2 months</p>
      </div>
    ),
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (rating) => <Rate allowHalf defaultValue={2.5} />
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, item) => (
      <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined className='font-bold text-2xl' />
        </Space>
      </a>
    </Dropdown>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    job_title: 'Software Engineer',
    address: 'New York No. 1 Lake Park',
    status: 'New',
  },
  {
    key: '2',
    name: 'Jim Green',
    job_title: 'QA Engineer',
    address: 'London No. 1 Lake Park',
    status: 'Interviewed',
  },
];

const Candidates = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Candidates;