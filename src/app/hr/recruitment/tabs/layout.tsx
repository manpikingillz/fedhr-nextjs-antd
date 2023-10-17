'use client';

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
    label: 'Job Openings',
    key: 'job_openings',
  },
  {
    label: 'Candidates',
    key: 'candidates',
  },
  {
    label: 'Talent Pools',
    key: 'talent_pools',
  },
  {
    label: 'Settings',
    key: 'settings',
  },
  {
    label: 'Templates',
    key: 'templates',
  },
];

export default function LeaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState('overview');
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path === '/hr/recruitment') {
      setCurrent('overview');
    }
  }, [path]);

  const onClick: MenuProps['onClick'] = (e) => {
    const key = e.key;
    setCurrent(key);

    switch (key) {
      case 'overview':
        router.push('/hr/recruitment/tabs');
        break;
      case 'job_openings':
        router.push('/hr/recruitment/tabs/job_openings');
        break;
      case 'candidates':
        router.push('/hr/recruitment/tabs/candidates');
        break;
      case 'talent_pools':
        router.push('/hr/recruitment/tabs/talent_pools');
        break;
      case 'settings':
        router.push('/hr/recruitment/tabs/settings');
        break;
      case 'templates':
        router.push('/hr/recruitment/tabs/contract_templates');
        break;
      default:
        router.push('/hr/recruitment/tabs');
        break;
    }
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div className="m-4">{children}</div>
    </div>
  );
}
