'use client';

import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HistoryOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  FieldTimeOutlined,
  SendOutlined,
  DollarOutlined,
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;


export default function App({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path.includes('/hr/employees')) {
      setCurrent('employees');
    }
    if (path.includes('/hr/leave')) {
      setCurrent('leave');
    }
    if (path.includes('/hr/recruitment')) {
      setCurrent('recruitment');
    }
    if (path.includes('/hr/schedules')) {
      setCurrent('schedules');
    }
    if (path.includes('/hr/payroll')) {
      setCurrent('payroll');
    }
    if (path.includes('/hr/time-and-attendance')) {
      setCurrent('time-and-attendance');
    }
  }, [path]);

  const items: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'administration',
      icon: <SettingOutlined />,
      label: 'Administration',
    },
    {
      key: 'employees',
      icon: <TeamOutlined />,
      label: 'Employees',
    },
    {
      key: 'recruitment',
      icon: <UsergroupAddOutlined />,
      label: 'Recruitment',
    },
    {
      key: 'leave',
      icon: <SendOutlined />,
      label: 'Leave',
    },
    {
      key: 'time-and-attendance',
      icon: <FieldTimeOutlined />,
      label: 'Time and Attendance',
    },
    {
      key: 'schedules',
      icon: <HistoryOutlined />,
      label: 'Schedules',
    },
    {
      key: 'payroll',
      icon: <DollarOutlined />,
      label: 'Payroll',
    },
  ];

  const profileAvatarItems: MenuProps['items'] = [
    {
      key: 'name',
      // icon: <ProfileOutlined />,
      label: 'Gilbert Twesigomwe',
    },
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const onAvatarItemClick: MenuProps['onClick'] = (e) => {
    const key = e.key
    if (key === 'logout') {
      router.push('/login')
    }
  }

  const onMenuItemClicked: MenuProps['onClick'] = (e) => {
    const key = e.key;
    setCurrent(key);

    switch (key) {
      case 'home':
        router.push('/hr');
        break;
      case 'dashboard':
        router.push('/hr/dashboard');
        break;
      case 'administration':
        router.push('/hr/administration');
        break;
      case 'employees':
        router.push('/hr/employees');
        break;
      case 'recruitment':
        router.push('/hr/recruitment');
        break;
      case 'leave':
        router.push('/hr/leave');
        break;
      case 'time-and-attendance':
        router.push('/hr/time-and-attendance');
        break;
      case 'schedules':
        router.push('/hr/schedules');
        break;
      case 'payroll':
        router.push('/hr/payroll');
        break;
      default:
        router.push('/hr');
        break;
    }
  };

  return (
    <div className='m-2'>
      <Layout style={{ minHeight: '100vh' }} className='rounded-xl'>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="rounded-xl"
        >
          <Link href="/hr">
          <div className="h-8 m-3 font-bold text-2xl flex-1 items-center cursor-pointer">
            {collapsed ? (
              <span className="text-white ml-1" v-if="collapsed">
                SHR
              </span>
            ) : (
              <span className="ml-4 text-white">Smooth HR</span>
            )}
          </div>
          </Link>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
            onClick={onMenuItemClicked}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            className="flex flex-row items-center justify-between"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Dropdown menu={{ items: profileAvatarItems, onClick: onAvatarItemClick }} className='mr-4'>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
