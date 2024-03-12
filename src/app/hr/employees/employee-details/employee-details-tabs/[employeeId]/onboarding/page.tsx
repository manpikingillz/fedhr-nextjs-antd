'use client'

import { Divider, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import React from 'react';

function Onboarding() {


  return (
    <>
      <UserAddOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Onbaording </Typography.Text>
      <Divider className='mt-2'/>
      Onboarding
    </>
  );
};

export default Onboarding;
