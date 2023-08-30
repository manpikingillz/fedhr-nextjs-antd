'use client'

import axios from '@/utils/axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Overview() {
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text: string, employee: any) => <Link href={`/hr/employees/employee-details/employee-details-tabs/${employee.id}`}>{text}</Link>,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ];

  async function getEmployees() {
    const response = await axios.get('employees/')
    return response.data
  }

  const {
    data: employees,
    error: errorEmployees,
    isFetching: isFetchingEmployees,
    isLoading: isLoadingEmployees,
    status: statusEmployees
  } = useQuery({queryKey: ['employees'], queryFn: getEmployees})

  if (errorEmployees) return (<h1> This is the error: {errorEmployees.message}</h1>)

  return (
    <>
      <button onClick={() => signIn()}>SignIn</button>
        <button onClick={() => signOut()}>SignOut</button>
      <Table dataSource={employees} columns={columns} loading={isFetchingEmployees} />;
    </>
  );
};

export default Overview;
