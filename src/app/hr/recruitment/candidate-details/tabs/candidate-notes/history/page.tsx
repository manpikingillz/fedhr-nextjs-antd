'use client';

import { Divider, Steps, Timeline, Typography } from 'antd';
import { useState } from 'react';
import { SmileOutlined, CopyOutlined, PlusCircleFilled, FileTextFilled, ThunderboltFilled } from '@ant-design/icons';

export default function CandidateHistory() {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <CopyOutlined className="text-xl text-blue-600" />
      <Typography.Text className="text-xl text-blue-600">
        {' '}
        Candidate History{' '}
      </Typography.Text>
      <Divider className="mt-2" />

      <Timeline
        className='ml-3'
        items={[
          {
            color: '#1677FF',
            dot: <div className='border-solid rounded-full text-gray-300'><FileTextFilled className="p-2 text-blue-500" /></div>,
            children: (
              <div className="ml-4 mt-0">
                <p>Applied for General Application</p>
                <p className="text-gray-500">Nov 24 at 1:07 PM</p>
              </div>
            ),
          },
          {
            color: '#1677FF',
            dot: <div className='border-solid rounded-full text-gray-300'><PlusCircleFilled className="p-2 text-blue-500" /></div>,
            children: (
              <div className="ml-4 mt-0">
                <p>Added to talent pool Finance</p>
                <p className="text-blue-500">GILBERT TWESIGOMWE</p>
                <p>test comment</p>
                <p className="text-gray-500">Today at 3:27 AM</p>
              </div>
            ),
          },
          {
            color: '#1677FF',
            dot: <div className='border-solid rounded-full text-gray-300'><ThunderboltFilled className="p-2 text-blue-500" /></div>,
            children: (
              <div className="ml-4 mt-0">
                <p>Status set to Phone Screened</p>
                <p className="text-blue-500">GILBERT TWESIGOMWE</p>
                <p className="text-gray-500">Today at 3:26 AM</p>
              </div>
            ),
          },
          {
            color: '#1677FF',
            dot: <div className='border-solid rounded-full text-gray-300'><ThunderboltFilled className="p-2 text-blue-500" /></div>,
            children: (
              <div className="ml-4 mt-0">
                <p>Status set to Phone Screened</p>
                <p className="text-blue-500">GILBERT TWESIGOMWE</p>
                <p className="text-gray-500">Today at 3:26 AM</p>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
