import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
import { VisaInformationData } from './types';
import { useParams } from 'next/navigation';
import { getVisaInformationsApi } from './api';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs'

const columns: ColumnsType<VisaInformationData> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => <span>{dayjs(date).format('MMM D, YYYY')}</span>
  },
  {
    title: 'Visa',
    dataIndex: 'visa',
    key: 'visa',
    render: (visa: any) => <span>{visa.visa_name}</span>,
  },
  {
    title: 'Issued Date',
    dataIndex: 'issued_date',
    key: 'issued_date',
    render: (issued_date: string) => <span>{dayjs(issued_date).format('MMM D, YYYY')}</span>
  },
  {
    title: 'Issuing Country',
    key: 'issuing_country',
    dataIndex: 'issuing_country',
    render: (issuing_country: any) => <span>{issuing_country.country_name}</span>,
  },
  {
    title: 'Expiration Date',
    key: 'expiration_date',
    dataIndex: 'expiration_date',
    render: (expiration_date: string) => <span>{dayjs(expiration_date).format('MMM D, YYYY')}</span>,
  },
  {
    title: 'Note',
    key: 'note',
    dataIndex: 'note',
  },
];


const VisaInformation = () => {
  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: visaInformations,
    error: errorVisaInformations,
    isFetching: isFetchingVisaInformations,
    isLoading: isLoadingVisaInformations,
    status: statusVisaInformations,
  } = useQuery<VisaInformationData[]>({
    queryKey: ['visa_informations', params.employeeId],
    queryFn: () => getVisaInformationsApi(parseInt(params.employeeId)),
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
      <Table columns={columns} dataSource={visaInformations} pagination={false} />
    </div>
  );
};

export default VisaInformation;
