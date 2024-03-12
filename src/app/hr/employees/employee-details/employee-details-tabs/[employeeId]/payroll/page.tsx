'use client'

import { Divider, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import React from 'react';

function Payroll() {


  return (
    <>
      <DollarOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Payroll </Typography.Text>
      <Divider className='mt-2'/>
      Payroll
    </>
  );
};

export default Payroll;
