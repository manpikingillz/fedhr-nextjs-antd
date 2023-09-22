'use client';

import { Button } from 'antd';
import React from 'react';
import { LeftCircleTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const UpdateJobOpening = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <Button
            icon={<LeftCircleTwoTone />}
            type="link"
            className="mb-4"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <div>Update Job Opening</div>
      </div>
    </>
  );
};

export default UpdateJobOpening;
