'use client';

import axios from '@/utils/axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import type { ColumnsType } from 'antd/es/table';
import { EmployeeListData } from '../employee-details/employee-details-tabs/[employeeId]/personal-information/types';
import { getEmployeeListApi } from './api';

function Overview() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const columns: ColumnsType<EmployeeListData> = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text: string, employee: any) => (
        <Link
          href={`/hr/employees/employee-details/employee-details-tabs/${employee.id}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const {
    data: employees,
    error: errorEmployees,
    isFetching: isFetchingEmployees,
    isLoading: isLoadingEmployees,
    status: statusEmployees,
  } = useQuery<EmployeeListData[]>({
    queryKey: ['employees'],
    queryFn: () => getEmployeeListApi(),
  });

  return (
    <Table
      dataSource={employees}
      columns={columns}
      loading={isFetchingEmployees}
    />
  );
}

export default Overview;
