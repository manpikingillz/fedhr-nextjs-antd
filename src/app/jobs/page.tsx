'use client';

import { Card, Divider, Typography } from 'antd';
import { ProfileTwoTone } from '@ant-design/icons';

const JobsList = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
      <p className="ml-8 mt-4 text-2xl text-blue-600 font-bold">Smooth HR</p>
      <Card className="min-h-screen w-5/6  mx-8 my-8">
        <ProfileTwoTone className="text-2xl ml-4" />
        <Typography.Text className="text-2xl ml-4 text-blue-600">
          Current Openings
        </Typography.Text>
        <p className="text-base ml-4 py-2 text-gray-500">Thanks for checking out our job openings. See something that interests you? Apply here.</p>
        <Divider className="mt-2" />
      </Card>
      </div>
    </>
  );
};

export default JobsList;
