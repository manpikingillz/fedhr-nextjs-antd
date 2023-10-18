import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-sort-variant text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>Short Answer</p>
            <p  className='text-gray-500'>Great for single sentences</p>
        </div>
     </div>
    ),
  },
  {
    key: '2',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-format-align-left text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>Long Answer</p>
            <p  className='text-gray-500'>Great for detailed paragraphs</p>
        </div>
     </div>
    ),
  },
  {
    key: '3',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-circle-slice-4 text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>Yes/No</p>
            <p  className='text-gray-500'>Provide two options to choose from on closed-ended questions.</p>
        </div>
     </div>
    ),
  },
  {
    key: '4',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-format-list-bulleted text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>Multiple Choice</p>
            <p  className='text-gray-500'>Provide several options to choose from</p>
        </div>
     </div>
    ),
  },
  {
    key: '5',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-checkbox-marked-outline text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>Checkbox</p>
            <p  className='text-gray-500'>Great for confirmation. "I agree on..."</p>
        </div>
     </div>
    ),
  },
  {
    key: '6',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-upload text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>File Upload</p>
            <p  className='text-gray-500'>Allow candidates to attach files.</p>
        </div>
     </div>
    ),
  },
  {
    type: 'divider'
  },
  {
    key: '7',
    label: (
     <div className='flex items-center gap-x-2'>
        <span className='mdi mdi-page-previous-outline text-2xl text-blue-500'></span>
        <div className='flex flex-col'>
            <p className='text-gray-800 text-base'>Add Previous Questions</p>
            {/* <p  className='text-gray-500'>Great for single sentences</p> */}
        </div>
     </div>
    ),
  },
  
];

const AdditionalQuestions = () => {
  return (
    <>
      <h1 className='mb-4'>Additional Questions</h1>
      <Dropdown menu={{ items }}>
        <Button type='default' onClick={(e) => e.preventDefault()} className='text-blue-500 border-blue-500 rounded-none'>
            Add Question
            <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};
export default AdditionalQuestions;
