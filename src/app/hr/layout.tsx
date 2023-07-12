'use client'

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
  HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;

export default function App({children}: {children: React.ReactNode}) {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home')

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter()
  const path = usePathname()

  useEffect(()=> {
    if (path.includes('/hr/employees')) {
      setCurrent('employees')
    }
    if (path.includes('/hr/leave')) {
      setCurrent('leave')
    }
    if (path.includes('/hr/recruitment')) {
      setCurrent('recruitment')
    }
    if (path.includes('/hr/schedules')) {
      setCurrent('schedules')
    }
    if (path.includes('/hr/payroll')) {
      setCurrent('payroll')
    }
    if (path.includes('/hr/time-and-attendance')) {
      setCurrent('time-and-attendance')
    }
  },[path ])

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
  ]

  const onMenuItemClicked: MenuProps['onClick'] = (e) => {
    const key = e.key
    setCurrent(key)

    switch(key) {
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
        router.push('/hr')
        break;
    }
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-8 m-3 font-bold text-2xl flex-1 items-center">
          {
            collapsed ?
            <span className="text-white ml-1" v-if="collapsed">SHR</span> :
            <span className="ml-4 text-white">Smooth HR</span>
          }
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          selectedKeys={[current]}
          onClick={onMenuItemClicked}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
  );
};
