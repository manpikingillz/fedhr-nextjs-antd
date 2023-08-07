'use client'

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
  {
    label: 'Personal Information',
    key: 'personal-information',
  },
  {
    label: 'Employment Information',
    key: 'employment-information',
  },
  {
    label: 'Time Off',
    key: 'time-off',
  },
  {
    label: 'Documents',
    key: 'documents',
  },
  {
    label: 'Notes',
    key: 'notes',
  },
  {
    label: 'Payroll',
    key: 'payroll'
  },
  {
    label: 'Benefits',
    key: 'benefits',
  },
  {
    label: 'Training',
    key: 'training'
  },
  {
    label: 'Assets',
    key: 'assets'
  },
  {
    label: 'Emergency',
    key: 'emergency'
  },
  {
    label: 'Onboarding',
    key: 'onboarding'
  },
  {
    label: 'Offboarding',
    key: 'offboarding'
  }
];

export default function EmployeesLayout({children}: {children: React.ReactNode}) {
    const [current, setCurrent] = useState('overview');
    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        if (path === '/hr/employees') {
            setCurrent('employees-overview')
        }
    },[path])

    const onClick: MenuProps['onClick'] = (e) => {
        const key = e.key
        setCurrent(key);

        switch(key) {
            case 'personal-information':
                router.push('/hr/employees/employee-details/employee-details-tabs/personal-information');
                break;
            case 'employment-information':
                router.push('/hr/employees/employee-details/employee-details-tabs/employment-information');
                break;
            case 'time-off':
                router.push('/hr/employees/employee-details/employee-details-tabs/time-off');
                break;
            case 'documents':
                router.push('/hr/employees/employee-details/employee-details-tabs/documents');
                break;
            case 'notes':
              router.push('/hr/employees/employee-details/employee-details-tabs/notes');
              break;
            case 'payroll':
              router.push('/hr/employees/employee-details/employee-details-tabs/payroll');
              break;
            case 'benefits':
              router.push('/hr/employees/employee-details/employee-details-tabs/benefits');
              break;
            case 'training':
              router.push('/hr/employees/employee-details/employee-details-tabs/training');
              break;
            case 'assets':
              router.push('/hr/employees/employee-details/employee-details-tabs/assets');
              break;
            case 'emergency':
              router.push('/hr/employees/employee-details/employee-details-tabs/emergency');
              break;
            case 'onboarding':
              router.push('/hr/employees/employee-details/employee-details-tabs/onboarding');
              break;
            case 'offboarding':
              router.push('/hr/employees/employee-details/employee-details-tabs/offboarding');
              break;
            default:
                router.push('/hr/employees/employee-details/employee-details-tabs/personal-information');
                break;
        }

    };

    return (
        <div className='flex'>
            <Menu onClick={onClick} selectedKeys={[current]} mode="vertical w-2/12" items={items} />
            <div className='m-4 w-full'>
                {children}
            </div>
        </div>
    )
}