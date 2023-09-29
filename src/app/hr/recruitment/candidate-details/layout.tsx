'use client';

import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
  {
    label: 'Candidate Info',
    key: 'candidate-info',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Notes',
    key: 'notes',
    icon: <CommentOutlined />,
  },
  {
    label: 'Emails',
    key: 'emails',
    icon: <MailOutlined />,
  },
];

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

const CandidateDetail = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [current, setCurrent] = useState('mail');
  const router = useRouter();

  // Tabs menu
  const tabsMenuOnClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    const key = e.key
    setCurrent(key);

    switch (key) {
        case 'candidate-info':
          router.push('/hr/recruitment/candidate-details/tabs/candidate-info');
          break;
        case 'notes':
          router.push('/hr/recruitment/candidate-details/tabs/candidate-notes');
          break;
        case 'emails':
            router.push('/hr/recruitment/candidate-details/tabs/candidate-emails');
            break;
        default:
            router.push('/hr/recruitment/candidate-details/tabs/candidate-info');
            break;
    };
};

  return (
    <>
      <div className="flex">
        <div className="basis-3/4">
          <Menu
            onClick={tabsMenuOnClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <div className="m-4">{children}</div>
        </div>
        <div>
          <Card className="mb-4 border-stone-300 border-4">
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
            />
          </Card>
          <Card className="basis-1/4">
            <span className="text-gray-500">Location</span>
            <br />
            <span>Kampala, Uganda</span>
            <Divider />

            <span className="text-gray-500">Department</span>
            <br />
            <span>IT</span>
            <Divider />

            <span className="text-gray-500">Employment Type</span>
            <br />
            <span>Full-Time</span>
            <Divider />

            <span className="text-gray-500">Minimum Experience</span>
            <br />
            <span>Experienced</span>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CandidateDetail;
