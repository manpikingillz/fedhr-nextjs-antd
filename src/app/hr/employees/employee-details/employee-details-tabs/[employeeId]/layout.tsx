'use client'

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter, useParams } from 'next/navigation';


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

    const params = useParams()
    const router = useRouter()
    const path = usePathname()

    const employeeId = parseInt(params.employeeId)

    useEffect(() => {
        if (path.includes('/hr/employees')) {
            const pathKey = path.split('/').at(-1)
            setCurrent(pathKey)
        }
    },[path])

    const onClick: MenuProps['onClick'] = (e) => {
        const key = e.key
        setCurrent(key);

        switch(key) {
            case 'personal-information':
                router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/personal-information`);
                break;
            case 'employment-information':
                router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/employment-information`);
                break;
            case 'time-off':
                router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/time-off`);
                break;
            case 'documents':
                router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/documents`);
                break;
            case 'notes':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/notes`);
              break;
            case 'payroll':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/payroll`);
              break;
            case 'benefits':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/benefits`);
              break;
            case 'training':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/training`);
              break;
            case 'assets':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/assets`);
              break;
            case 'emergency':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/emergency`);
              break;
            case 'onboarding':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/onboarding`);
              break;
            case 'offboarding':
              router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/offboarding`);
              break;
            default:
                router.push(`/hr/employees/employee-details/employee-details-tabs/${employeeId}/personal-information`);
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