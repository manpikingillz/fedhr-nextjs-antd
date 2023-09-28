'use client';

import React from 'react';
import {
  Checkbox,
  Collapse,
  CollapseProps,
  DatePicker,
  Divider,
  Dropdown,
  MenuProps,
  Rate,
  Slider,
  Space,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  MoreOutlined,
  SmileOutlined,
  FileTextFilled,
  CommentOutlined,
  MailFilled,
  ToTopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
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
  {
    type: 'divider',
  },
  {
    key: '5',
    icon: <ToTopOutlined rotate={90} />,
    label: <a>Move Candidate</a>,
  },
  {
    key: '6',
    icon: <DeleteOutlined />,
    label: <a>Delete Candidate</a>,
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Candidate Info',
    dataIndex: 'name',
    key: 'name',
    render: (_, item) => (
      <div>
        <a>{item.name}</a>
        <p className="text-gray-500">{item.address}</p>
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
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

const ratingFilter = <Slider min={0} max={5} range defaultValue={[0, 5]} />;

const jobStatusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'OPEN', label: 'Open' },
  { value: 'ON_HOLD', label: 'On Hold' },
  { value: 'FILLED', label: 'Filled' },
  { value: 'CANCELLED', label: 'Cancelled' },
];
const jobStatusesFilter = (
  <Checkbox.Group style={{ width: '100%' }}>
    <div className="flex flex-col">
      {jobStatusOptions.map((option) => (
        <Checkbox value={option.value}>{option.label}</Checkbox>
      ))}
    </div>
  </Checkbox.Group>
);

const jobOpeningListOptions = [
  { value: '1', label: 'Software Engineer' },
  { value: '2', label: 'QA Engineer' },
  { value: '3', label: 'Automation engineer' },
  { value: '4', label: 'Backend Engineer' },
  { value: '5', label: 'UI/UX Designer' },
];
const jobOpeningsFilter = (
  <Checkbox.Group style={{ width: '100%' }}>
    <div className="flex flex-col">
      {jobOpeningListOptions.map((option) => (
        <Checkbox value={option.value}>{option.label}</Checkbox>
      ))}
    </div>
  </Checkbox.Group>
);

const applicationDatesFilter = (
  <Checkbox.Group style={{ width: '100%' }}>
    <div className="flex flex-col">
      <div className='flex flex-col'>
        <label>From</label>
        <DatePicker />
      </div>
      <div className='flex flex-col'>
        <label>To</label>
        <DatePicker />
      </div>
    </div>
  </Checkbox.Group>
);


const sourcesOptions = [
  { value: '1', label: 'Glassdoor' },
  { value: '2', label: 'Indeed' },
  { value: '3', label: 'Facebook' },
  { value: '4', label: 'LinkedIn' },
  { value: '5', label: 'Twitter' },
  { value: '6', label: 'Zip Recruiter' },
];
const sourcesFilter = (
  <Checkbox.Group style={{ width: '100%' }}>
    <div className="flex flex-col">
      {sourcesOptions.map((option) => (
        <Checkbox value={option.value}>{option.label}</Checkbox>
      ))}
    </div>
  </Checkbox.Group>
);

const locationsOptions = [
  { value: '1', label: 'London, UK' },
  { value: '2', label: 'Kampala, Uganda' },
  { value: '3', label: 'Nairobi, Kenya' },
  { value: '4', label: 'Capetown, SA' },
  { value: '5', label: 'Lagos, Nigeria' },
  { value: '6', label: 'Kigali, Rwanda' },
];
const locationsFilter = (
  <Checkbox.Group style={{ width: '100%' }}>
    <div className="flex flex-col">
      {locationsOptions.map((option) => (
        <Checkbox value={option.value}>{option.label}</Checkbox>
      ))}
    </div>
  </Checkbox.Group>
);

const hiringLeadsOptions = [
  { value: '1', label: 'Gilbert Twesigonwe' },
  { value: '2', label: 'Eric Tumwine' },
  { value: '3', label: 'Rosette Katusiime' },
  { value: '4', label: 'Enock Tayebwa' },
  { value: '5', label: 'Richard Taremwa' },
  { value: '6', label: 'John Doe' },
];
const hiringLeadsFilter = (
  <Checkbox.Group style={{ width: '100%' }}>
    <div className="flex flex-col">
      {hiringLeadsOptions.map((option) => (
        <Checkbox value={option.value}>{option.label}</Checkbox>
      ))}
    </div>
  </Checkbox.Group>
);
const collapseItems: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Job Statuses',
    children: jobStatusesFilter,
  },
  {
    key: '2',
    label: 'Job Openings',
    children: jobOpeningsFilter,
  },
  {
    key: '3',
    label: 'Star Rating',
    children: ratingFilter,
  },
  {
    key: '4',
    label: 'Application Dates',
    children: applicationDatesFilter,
  },
  {
    key: '5',
    label: 'Sources',
    children: sourcesFilter,
  },
  {
    key: '6',
    label: 'Job Locations',
    children: locationsFilter,
  },
  {
    key: '7',
    label: 'Hiring Leads',
    children: hiringLeadsFilter,
  },
];

const Candidates = () => {
  return (
    <>
      <div className="flex space-x-6">
        <div className="basis-1/4">
          <p className="h-10 pl-6 pt-2 bg-stone-500 text-white text-base">
            Filter Results
          </p>
          <Collapse
            items={collapseItems}
            bordered={false}
            defaultActiveKey={['1']}
          />
        </div>
        <Table columns={columns} dataSource={data} className="basis-3/4" />
      </div>
    </>
  );
};

export default Candidates;
