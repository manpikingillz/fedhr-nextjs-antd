'use client';

import { Card, Divider, Typography } from 'antd';
import { ProfileTwoTone, EnvironmentOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const JobsList = () => {
    const router = useRouter();

    const onJobOpeningClickHandler = () => {
        console.log('clicked')
        router.push('jobs/job-details/1')
    }
  return (
    <>
      <div className='flex flex-col items-center bg-blue-100'>
      <p className="ml-8 mt-4 text-2xl text-blue-600 font-bold">Smooth HR</p>
      <Card className="min-h-screen w-5/6  mx-8 my-8">
        <ProfileTwoTone className="text-2xl ml-4" />
        <Typography.Text className="text-2xl ml-4 text-blue-600">
          Current Openings
        </Typography.Text>
        <p className="text-base ml-4 py-2 text-gray-500">Thanks for checking out our job openings. See something that interests you? Apply here.</p>
        <Divider className="mt-2" />

        <div className='flex'>
            <div className='basis-1/2 cursor-pointer' onClick={onJobOpeningClickHandler}>
                <p className='text-gray-500'>Finance</p>
                <p className='text-blue-600 text-lg'>Software Engineer</p>
            </div>

            <p className='basis-1/4 text-lg text-gray-500'> <EnvironmentOutlined /> Kampala</p>

            <p className='basis-1/4 text-lg text-gray-500'> Full-Time</p>
        </div>
        <Divider className="mt-4" />
        <div className='flex'>
            <div className='basis-1/2'>
                <p className='text-gray-500'>Finance</p>
                <p className='text-blue-600 text-lg'>Software Engineer</p>
            </div>

            <p className='basis-1/4 text-lg text-gray-500'> <EnvironmentOutlined /> Kampala</p>

            <p className='basis-1/4 text-lg text-gray-500'> Full-Time</p>
        </div>
        <Divider className="mt-4" />
        <div className='flex'>
            <div className='basis-1/2'>
                <p className='text-gray-500'>Finance</p>
                <p className='text-blue-600 text-lg'>Software Engineer</p>
            </div>

            <p className='basis-1/4 text-lg text-gray-500'> <EnvironmentOutlined /> Kampala</p>

            <p className='basis-1/4 text-lg text-gray-500'> Full-Time</p>
        </div>
        <Divider className="mt-4" />

      </Card>
      </div>
    </>
  );
};

export default JobsList;
