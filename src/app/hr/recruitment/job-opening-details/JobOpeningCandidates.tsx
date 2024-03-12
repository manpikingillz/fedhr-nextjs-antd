'use client';

import React from 'react';
import { Button, Divider, Dropdown, MenuProps, Rate, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  MoreOutlined,
  FileTextFilled,
  CommentOutlined,
  MailFilled,
  PlusCircleFilled,
  ContactsFilled,
  DownOutlined,
  UserOutlined,
  CaretDownFilled,
  SettingFilled
} from '@ant-design/icons';
import Link from 'next/link';

interface DataType {
  key: string;
  name: string;
  address: string;
  status: string;
  applied: String;
  lastEmail: String;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <FileTextFilled />,
    label: <a>View Resume</a>,
  },
  {
    key: '2',
    icon: <CommentOutlined />,
    label: <a>Add Comment</a>,
  },
  {
    key: '3',
    icon: <MailFilled />,
    label: <a>Send Email</a>,
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Candidate Info',
    dataIndex: 'name',
    key: 'name',
    render: (_, item) => (
      <div>
        <Link href="/hr/recruitment/candidate-details/tabs/candidate-info">
          {item.name}
        </Link>
        <p className="text-gray-500">{item.address}</p>
      </div>
    ),
  },

  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, item) => (
      <div>
        {item.status}
        <p className="text-gray-500">Updated in 2 months</p>
      </div>
    ),
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (rating) => <Rate allowHalf defaultValue={2.5} />,
  },
  {
    title: 'Applied',
    dataIndex: 'applied',
    key: 'applied',
  },
  {
    title: 'Last Email',
    dataIndex: 'lastEmail',
    key: 'lastEmail',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, item) => (
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined className="font-bold text-2xl" />
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
    address: 'New York No. 1 Lake Park',
    status: 'New',
    applied: 'Nov 24, 2023',
    lastEmail: '',
  },
  {
    key: '2',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
    status: 'Interviewed',
    applied: 'Nov 20, 2023',
    lastEmail: 'Application for Role',
  },
];

const statusOptions = [
  { value: 'stillInTheRunning', label: 'Still in the Running' },
  { value: 'new', label: 'New' },
  { value: 'All', label: 'All' },
];

const handleOnStatusChangeHandler = () => {};

const JobOpeningCandidates = () => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

//   const handleMenuClick2: MenuProps['onClick'] = (e) => {
//     console.log('click', e);
//   };

  const items: MenuProps['items'] = [
    {
      label: 'New Blank Email',
      key: '1'
    },
    {
      label: 'Phone Conversation Request',
      key: '2'
    },
    {
      label: 'Invitation to In-Person Interview',
      key: '3'
    },
    {
      label: 'Regret to Inform - Applicant',
      key: '4'
    },
    {
        label: 'Regret to Inform - Interviewed',
        key: '5'
      },
      {
        label: 'Regret to Inform - International',
        key: '6'
      },
      {
        label: 'Request for References',
        key: '7'
      }
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

//   const items2: MenuProps['items'] = [
//     {
//       label: 'Update Status',
//       key: '1'
//     },
//     {
//       label: 'Move Candidate',
//       key: '2'
//     },
//     {
//       label: 'Delete Candidate',
//       key: '3'
//     }
//   ];

//   const menuProps2 = {
//     items2,
//     onClick: handleMenuClick2,
//   };

  return (
    <>
    <div className='flex justify-between mb-2 items-center'>
      <div className="flex mb-3">
        <div className="flex gap-x-2 items-center">
          <ContactsFilled className="text-lime-700 text-lg" />{' '}
          <p className="text-lg text-lime-700">1 Candidate (1 New)</p>
        </div>

        <Button type="link" icon={<PlusCircleFilled />}>
          New Candidate
        </Button>
      </div>
      <div className='flex gap-x-2 items-center'>
        <Select
          defaultValue="New"
          style={{ width: 240 }}
          onChange={handleOnStatusChangeHandler}
          options={statusOptions}
        />
        <Dropdown menu={menuProps}>
          <Button>
            <div className='flex gap-x-1'>
            <MailFilled  className='text-2xl text-gray-600' />
            <CaretDownFilled className='text-gray-600'/>
            </div>
          </Button>
        </Dropdown>
        <Dropdown menu={menuProps}>
          <Button>
            <div className='flex gap-x-1'>
            <SettingFilled  className='text-2xl text-gray-600' />
            <CaretDownFilled className='text-gray-600' />
            </div>
          </Button>
        </Dropdown>
      </div>
      </div>
      <Table columns={columns} dataSource={data} className="basis-3/4" />
    </>
  );
};

export default JobOpeningCandidates;
