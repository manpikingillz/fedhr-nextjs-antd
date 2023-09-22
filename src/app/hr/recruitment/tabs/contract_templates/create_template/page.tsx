'use client'

import CustomTipTapEditor from '@/app/components/TipTapEditor/CustomTipTapEditor';
import { Button } from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const CreateUpdateTemplatePage = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col">
      <div className='flex justify-end'>
        <Button icon={<LeftCircleTwoTone />} type="link" className="mb-4" onClick={() => router.back()}>
          Back
        </Button>
        </div>
        <div>
            <CustomTipTapEditor  />
        </div>
      </div>
    </>
  );
};

export default CreateUpdateTemplatePage;
