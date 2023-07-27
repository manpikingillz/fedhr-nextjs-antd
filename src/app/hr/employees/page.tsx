'use client'

import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';

function Overview() {
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
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

  async function getEmployees() {
    const response = await axios.get('http://localhost:8000/api/employees/')
    console.log('response/: ', response.data)
    return response.data
  }

  const { data: employees, error, isFetching, isLoading } = useQuery({queryKey: ['employees'], queryFn: getEmployees})

  if (error) return (<h1> This is the error: {error.message}</h1>)

  return (
    <>
      <Table dataSource={employees} columns={columns} loading={isFetching} />;
    </>
  );
};

export default Overview;
