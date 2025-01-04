'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Button, Tabs, Dropdown, Space, Input } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { ColumnsType } from 'antd/es/table';
import { EmployeeListData } from '../employee-details/employee-details-tabs/[employeeId]/personal-information/types';
import { getEmployeeListApi } from './api';
import { 
  DownOutlined, UnorderedListOutlined, TeamOutlined, ClusterOutlined, 
  ExportOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined,
  FilterOutlined, SearchOutlined
} from '@ant-design/icons';

const { Search } = Input;

function Overview() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const columns: ColumnsType<EmployeeListData> = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: true,
      render: (text: string, employee: any) => (
        <Link
          href={`/hr/employees/employee-details/employee-details-tabs/${employee.id}/personal-information`}
        >
          {`${employee.first_name} ${employee.last_name}`}
        </Link>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      sorter: true,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorter: true,
    },
    {
      title: 'Employment Status',
      dataIndex: 'employment_status',
      key: 'employment_status',
      sorter: true,
    },
    {
      title: 'Hire Date',
      dataIndex: 'hire_date',
      key: 'hire_date',
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: EmployeeListData) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined style={{color: '#1890ff'}} />} onClick={() => handleView(record)} />
          <Button type="text" icon={<EditOutlined style={{color: '#1890ff'}} />} onClick={() => handleEdit(record)} />
          <Button type="text" icon={<DeleteOutlined style={{color: '#1890ff'}} />} onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  const handleView = (record: EmployeeListData) => {
    // Handle view action
  };

  const handleEdit = (record: EmployeeListData) => {
    // Handle edit action
  };

  const handleDelete = (record: EmployeeListData) => {
    // Handle delete action
  };

  const {
    data: employees,
    error: errorEmployees,
    isFetching: isFetchingEmployees,
    isLoading: isLoadingEmployees,
    status: statusEmployees,
  } = useQuery<EmployeeListData[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await getEmployeeListApi();
      return Array.isArray(response) ? response : [response];
    },
  });

  const tabItems = [
    {
      key: '1',
      label: 'List',
      icon: <UnorderedListOutlined />,
    },
    {
      key: '2', 
      label: 'Directory',
      icon: <TeamOutlined />,
    },
    {
      key: '3',
      label: 'Org Chart',
      icon: <ClusterOutlined />,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-[#e6f4ff] rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Total Employees</div>
          <div className="text-2xl font-semibold text-[#1677ff]">200</div>
        </div>
        <div className="flex-1 bg-[#e6f4ff] rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">On Leave</div>
          <div className="text-2xl font-semibold text-[#faad14]">10</div>
        </div>
        <div className="flex-1 bg-[#e6f4ff] rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Resigned</div>
          <div className="text-2xl font-semibold text-[#ff4d4f]">30</div>
        </div>
        <div className="flex-1 bg-[#e6f4ff] rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Terminated</div>
          <div className="text-2xl font-semibold text-[#ff4d4f]">25</div>
        </div>
        <div className="flex-1 bg-[#e6f4ff] rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Employees Active</div>
          <div className="text-2xl font-semibold text-[#52c41a]">110</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button type="primary" icon={<PlusOutlined />}>
          New Employee
        </Button>
        
        <div className="flex gap-4">
          <Tabs items={tabItems} />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Dropdown 
          menu={{ 
            items: [
              { key: 'all', label: 'All Employees' },
              { key: 'active', label: 'Active' },
              { key: 'inactive', label: 'Inactive' },
              { key: 'contractors', label: 'Contractors' },
              { key: 'hourly', label: 'Hourly Employees' },
              { key: 'managers', label: 'Managers' },
              { key: 'new', label: 'New Employees' },
              { key: 'salary', label: 'Salary Employees' },
              { key: 'terminated', label: 'Terminated Employees' },
              { key: 'upcoming', label: 'Upcoming Employees' },
              { 
                key: 'search',
                label: (
                  <Input.Search
                    placeholder="Search"
                    style={{ width: '100%', padding: '8px' }}
                    onClick={e => e.stopPropagation()}
                  />
                )
              }
            ]
          }}
          trigger={['click']}
          dropdownRender={menu => (
            <div onClick={e => e.stopPropagation()}>
              {menu}
            </div>
          )}
        >
          <Button>
            <Space>
              All Employees
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Button icon={<FilterOutlined />}>Filter</Button>
        <Button>Custom View</Button>
        <Button icon={<EditOutlined />}>Power Edit</Button>
        <Button icon={<ExportOutlined />}>Export CSV</Button>

        <Search
          placeholder="Search by Name, Phone Number"
          className="flex-1"
          allowClear
        />
      </div>

      <Table
        dataSource={employees}
        columns={columns}
        loading={isFetchingEmployees}
      />
    </div>
  );
}

export default Overview;
