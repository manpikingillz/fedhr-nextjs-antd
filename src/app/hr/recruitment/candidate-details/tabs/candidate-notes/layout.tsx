'use client';

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
  {
    label: 'Comments',
    key: 'comments',
  },
  {
    label: 'History',
    key: 'history',
  },
  {
    label: 'All',
    key: 'all',
  }
];

export default function CandidateNotes({
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
      case 'comments':
        router.push('/hr/recruitment/candidate-details/tabs/candidate-notes/comments');
        break;
      case 'history':
        router.push('/hr/recruitment/candidate-details/tabs/candidate-notes/history');
        break;
      case 'all':
        router.push('/hr/recruitment/candidate-details/tabs/candidate-notes/comments-and-history');
        break;
      default:
        router.push('/hr/recruitment/candidate-details/tabs/candidate-notes/comments');
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
