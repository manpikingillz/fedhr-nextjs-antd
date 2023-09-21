'use client';

import { getTemplateApi } from '@/app/api/template-api';
import CustomTipTapEditor from '@/app/components/TipTapEditor/CustomTipTapEditor';
import {
  TemplateDetailData,
  TemplateListData,
} from '@/app/types/template-types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const CreateUpdateTemplatePage = () => {
  const params = useParams();

  

  //write code to fetch template using the getTemplateApi. Use react-query's useQuery hook
  //use the templateId from params to fetch the template
  //use the template data to set the value of the editor
  //use the template data to set the value of the form
  //use the template data to set the value of the form
  //use the template data to set the value of the form
  //use the template data to set the value of the form

  const {
    data: templateDetail,
    error: errorTemplateDetail,
    isFetching: isFetchingTemplateDetail,
    isLoading: isLoadingTemplateDetail,
    status: statusTemplateDetail
  } = useQuery<TemplateDetailData>({
    queryKey: ['template-detail', params.templateId],
    queryFn: () => getTemplateApi(parseInt(params.templateId)),
  });

  return (
    <>
      {templateDetail && <CustomTipTapEditor templateData={templateDetail} />}
    </>
  );
};

export default CreateUpdateTemplatePage;
