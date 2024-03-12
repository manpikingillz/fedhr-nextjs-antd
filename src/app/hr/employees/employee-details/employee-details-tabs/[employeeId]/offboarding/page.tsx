'use client'

import { Divider, Typography } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';

import React from 'react';

function Offboarding() {


  return (
    <>
      <UserDeleteOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Off boarding </Typography.Text>
      <Divider className='mt-2'/>
      Offboarding
    </>
  );
};

export default Offboarding;
