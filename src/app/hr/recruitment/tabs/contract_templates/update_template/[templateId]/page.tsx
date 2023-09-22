'use client';

import { getTemplateApi } from '@/app/api/template-api';
import CustomTipTapEditor from '@/app/components/TipTapEditor/CustomTipTapEditor';
import {
  TemplateDetailData,
  TemplateListData,
} from '@/app/types/template-types';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { LeftCircleTwoTone } from '@ant-design/icons';


const CreateUpdateTemplatePage = () => {
  const params = useParams();
  const router = useRouter();

  const {
    data: templateDetail,
    error: errorTemplateDetail,
    isFetching: isFetchingTemplateDetail,
    isLoading: isLoadingTemplateDetail,
    status: statusTemplateDetail,
  } = useQuery<TemplateDetailData>({
    queryKey: ['template-detail', params.templateId],
    queryFn: () => getTemplateApi(parseInt(params.templateId)),
  });

  return (
    <>
      <div className="flex flex-col">
      <div className='flex justify-end'>
        <Button icon={<LeftCircleTwoTone />} type="link" className="mb-4" onClick={() => router.back()}>
          Back
        </Button>
        </div>
        <div>
          {templateDetail && (
            <CustomTipTapEditor templateData={templateDetail} />
          )}
        </div>
      </div>
    </>
  );
};

export default CreateUpdateTemplatePage;
