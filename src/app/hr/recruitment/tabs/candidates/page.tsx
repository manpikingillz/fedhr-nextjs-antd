'use client'

import React from 'react';
import { Collapse, CollapseProps, Divider, Dropdown, MenuProps, Rate, Slider, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MoreOutlined, SmileOutlined, FileTextFilled, CommentOutlined, MailFilled, ToTopOutlined, DeleteOutlined} from '@ant-design/icons';
import Card from 'antd/es/card/Card';

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

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const ratingFilter = (
  <Slider min={0} max={5} range defaultValue={[0, 5]}  />
)

const collapseItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Job Statuses',
    children: text,
  },
  {
    key: '2',
    label: 'Job Openings',
    children: text,
  },
  {
    key: '3',
    label: 'Star Rating',
    children: ratingFilter,
  },
  {
    key: '4',
    label: 'Application Dates',
    children: text,
  },
  {
    key: '5',
    label: 'Sources',
    children: text,
  },
  {
    key: '6',
    label: 'Job Locations',
    children: text,
  },
  {
    key: '7',
    label: 'Hiring Leads',
    children: text,
  }
];

const Candidates = () => {
  return (
    <>
      <div className='flex space-x-6'>
        <div className='basis-1/4'>
          <p className='h-10 pl-6 pt-2 bg-stone-500 text-white text-base'>Filter Results</p>
          <Collapse items={collapseItems} bordered={false} defaultActiveKey={['1']} />
        </div>
        <Table columns={columns} dataSource={data} className='basis-3/4' />
      </div>
    </>
  );
}

export default Candidates;