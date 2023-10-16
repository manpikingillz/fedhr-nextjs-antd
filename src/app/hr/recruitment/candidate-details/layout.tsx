'use client';

import React, { useEffect, useState } from 'react';
import {
  InfoCircleOutlined,
  CommentOutlined,
  MailOutlined,
  SettingFilled,
  CheckCircleFilled,
  EditFilled,
  MessageFilled,
  MailFilled,
  CaretDownFilled,
  EditOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Menu,
  Rate,
  Select,
  Space,
} from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const activeStatuses = [
  { value: 'REVIEWED', label: 'Reviewed' },
  { value: 'SCHEDULE_PHONE_SCREEN', label: 'Schedule Phone Screen' },
  { value: 'PHONE_SCREENED', label: 'Phone Screened' },
  { value: 'SCHEDULE_INTERVIEW', label: 'Schedule Interview' },
  { value: 'INTERVIEWED', label: 'Interviewed' },
  { value: 'PUT_ON_HOLD', label: 'Put on Hold' },
  { value: 'CHECKING_REFERENCES', label: 'Checking References' },
];

const notHiredStatuses = [
  { value: 'NOT_A_FIT', label: 'Not a Fit' },
  { value: 'DECLINED_OFFER', label: 'Declined Offer' },
  { value: 'NOT_QUALIFIED', label: 'Not Qualified' },
  { value: 'OVER_QUALIFIED', label: 'Over Qualified' },
  { value: 'HIRED_ELSEWHERE', label: 'Hired Elsewhere' },
];

const candidateActionMenuItems: MenuProps['items'] = [
  {
    label: 'Edit Candidate Info',
    key: '1',
    //   icon: <UserOutlined />,
  },
  {
    label: 'Edit Talent Pools',
    key: '2',
    //   icon: <UserOutlined />,
  },
  //   {
  //     type: 'divider',
  //   },
  {
    label: 'Delete Candidate',
    key: '4',
    //   icon: <UserOutlined />,
  },
];

const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};

const menuProps = {
  candidateActionMenuItems,
  onClick: handleMenuClick,
};

const CandidateDetail = ({ children }: { children: React.ReactNode }) => {
  const [current, setCurrent] = useState('mail');
  const router = useRouter();

  const path = usePathname();

  useEffect(() => {
    if (path.includes('candidate-details/tabs/')) {
      const pathKey = path.split('/').at(-1);
      setCurrent(pathKey);
    }
  }, [path]);

  const items: MenuProps['items'] = [
    {
      label: 'Candidate Info',
      key: 'candidate-info',
      icon: <InfoCircleOutlined />,
      className: `${
        current == 'candidate-info' ? 'bg-white' : 'bg-blue-500 text-white'
      }`,
    },
    {
      label: 'Notes',
      key: 'candidate-notes',
      icon: <CommentOutlined />,
      className: `${
        current == 'candidate-notes' ? 'bg-white' : 'bg-blue-500 	text-white'
      }`,
    },
    {
      label: 'Emails',
      key: 'candidate-emails',
      icon: <MailOutlined />,
      className: `${
        current == 'candidate-emails' ? 'bg-white' : 'bg-blue-500 text-white'
      }`,
    },
  ];

  // Tabs menu
  const tabsMenuOnClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    const key = e.key;
    setCurrent(key);

    switch (key) {
      case 'candidate-info':
        router.push('/hr/recruitment/candidate-details/tabs/candidate-info');
        break;
      case 'candidate-notes':
        router.push('/hr/recruitment/candidate-details/tabs/candidate-notes');
        break;
      case 'candidate-emails':
        router.push('/hr/recruitment/candidate-details/tabs/candidate-emails');
        break;
      default:
        router.push('/hr/recruitment/candidate-details/tabs/candidate-info');
        break;
    }
  };

  return (
    <>
      {/* <div className="flex items-end bg-blue-500 h-20"></div> */}
      <div className="flex z-10">
        <div className="basis-3/4">
        <div className="flex items-end bg-gradient-to-r from-blue-500 to-blue-50 h-48">
          <Menu
            onClick={tabsMenuOnClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{width: 342}}
          />
          </div>
          <div className="m-4">{children}</div>
        </div>

        <div className="basis-1/4 bg-zinc-100">
          <Card className="mb-4 border-stone-300 border-4 p-x-2">
            <Rate defaultValue={3} className="text-3xl mb-4" />
            <div className="flex justify-around">
              <p className="border-solid border-neutral-400">
                <MessageFilled className="text-2xl px-3 py-1 text-neutral-600" />
              </p>
              <p className="border-solid border-neutral-400">
                <MailFilled className="text-2xl px-3 py-1 text-neutral-600" />
              </p>
              <p className="border-solid border-neutral-400">
                {/* <Dropdown menu={menuProps}>
                  <Button type="link">
                    <div className="flex gap-x-2">
                      <SettingFilled className="text-2xl text-neutral-600" />
                      <CaretDownFilled className="text-neutral-600" />
                    </div>
                  </Button>
                </Dropdown> */}
              </p>
            </div>
            <Divider className="mt-4 mb-3" />
            <p className="mb-2">Updated 22 minutes ago</p>
            <Select
              style={{ width: 200 }}
              showSearch
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <div className="flex flex-col">
                    <div className="flex gap-x-2 h-8 items-center hover:bg-gray-100 hover:cursor-pointer ">
                      <EditFilled className="text-lg text-blue-500" />
                      <Link href="">Create Offer Letter</Link>
                    </div>
                    <div className="flex gap-x-2 mt-2 h-8 items-center hover:bg-gray-100 hover:cursor-pointer">
                      <CheckCircleFilled className="text-lg text-blue-500" />
                      <Link href="">Hire</Link>
                    </div>
                  </div>
                </>
              )}
              options={[
                { label: 'New', value: 'New' },
                {
                  label: 'Active Statuses',
                  options: activeStatuses,
                },

                {
                  label: 'Not Hired Beause',
                  options: notHiredStatuses,
                },
              ]}
              defaultValue="New"
            />
          </Card>
          <div className='px-3'>
            <p className="text-gray-500">Desired Pay</p>
            <p>$60,000</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Available Start Date</p>
            <p>Dec 14, 2023</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Phone</p>
            <p>0780 332 423</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Email</p>
            <p>johndoe@company.com</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Website, Blog or Portfolio</p>
            <p>https://www.somesite.com</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Address</p>
            <p>335 South 560 West</p>
            <p>Lindon, 84042</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">College/University</p>
            <p>Tulane</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Highest Education Obtained</p>
            <p>College - Master of Fine Arts</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Referred By</p>
            <p>Sam Walker</p>
            <Divider className="mt-2 mb-3" />

            <p className="text-gray-500">Source</p>
            <p>other</p>
            <Divider className="mt-2 mb-3" />

            <div className="flex justify-between">
              <p className="font-bold">Talent Pools</p>
              <MailFilled />
              <EditOutlined />
            </div>
            <p className="text-blue-500">Sam Walker</p>
            <p className="text-gray-500">Oct 3 (2 hours ago)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateDetail;
