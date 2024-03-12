'use client'

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
  {
    label: 'Overview',
    key: 'employees-overview',
  },
  {
    label: 'Org Chart',
    key: 'employees-orgchart',
  },
  {
    label: 'Settings',
    key: 'employees-settings'
  }
];

export default function EmployeesLayout({children}: {children: React.ReactNode}) {
    const [current, setCurrent] = useState('overview');
    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        if (path === '/hr/employees/employees-tabs') {
            setCurrent('employees-overview')
        }
    },[path])

    const onClick: MenuProps['onClick'] = (e) => {
        const key = e.key
        setCurrent(key);

        switch(key) {
            case 'employees-overview':
                router.push('/hr/employees/employees-tabs');
                break;
            case 'employees-orgchart':
                router.push('/hr/employees/employees-tabs/orgchart');
                break;
            case 'employees-settings':
                router.push('/hr/employees/employees-tabs/employees-settings');
                break;
            default:
                router.push('/hr/employees/employees-tabs/overview');
                break;
        }

    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <div className='m-4'>
                {children}
            </div>
        </div>
    )
}