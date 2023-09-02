import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';

interface VisaData {
  key: string;
  date: string;
  visa: string;
  issued_date: string;
  issuing_country: string;
  expiration_date: string;
  note: string;
}

const columns: ColumnsType<VisaData> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Visa',
    dataIndex: 'visa',
    key: 'visa',
  },
  {
    title: 'Issued Date',
    dataIndex: 'issued_date',
    key: 'issued_date',
  },
  {
    title: 'Issuing Country',
    key: 'issuing_country',
    dataIndex: 'issuing_country',
  },
  {
    title: 'Expiration Date',
    key: 'expiration_date',
    dataIndex: 'expiration_date',
  },
  {
    title: 'Note',
    key: 'note',
    dataIndex: 'note',
  },
];
//TODO: Add status
const data: VisaData[] = [
  {
    key: '1',
    date: 'May 13, 2023',
    visa: 'Permanent Resident',
    issued_date: 'June 12, 2020',
    issuing_country: 'United Status',
    expiration_date: 'June 24, 2028',
    note: '4.9',
  },
  {
    key: '1',
    date: 'University of Science and Technology',
    visa: 'Bachelor of Computer Engineering',
    issued_date: 'Hardware Engineering',
    issuing_country: 'May 24, 2022',
    expiration_date: 'May 24, 2023',
    note: '4.9',
  },
];

const Visa = () => {
  return (
    <div className="flex flex-col">
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
      >
        Add
      </Button>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Visa;
