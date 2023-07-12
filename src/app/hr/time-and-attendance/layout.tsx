'use client'

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
  {
    label: 'Overview',
    key: 'overview',
  },
  {
    label: 'Settings',
    key: 'settings',
  }
];

export default function LeaveLayout({children}: {children: React.ReactNode}) {
    const [current, setCurrent] = useState('overview');
    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        if (path === '/hr/time-and-attendance') {
            setCurrent('overview')
        }
    },[path])

    const onClick: MenuProps['onClick'] = (e) => {
        const key = e.key
        setCurrent(key);

        switch(key) {
            case 'overview':
                router.push('/hr/time-and-attendance');
                break;
            case 'settings':
                router.push('/hr/time-and-attendance/settings');
                break;
            default:
                router.push('/hr/time-and-attendance');
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