'use client';

import { Button } from 'antd';
import React from 'react';
import { LeftCircleTwoTone } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import CreateUpdateJobOpening from '../../create_job_opening/CreateUpdateJobOpening';
import { JobOpeningListData } from '@/app/types/jop-opening-types';
import { useQuery } from '@tanstack/react-query';
import { getJobOpeningApi, getJobOpeningListApi } from '@/app/api/job-opening-api';

const UpdateJobOpening = () => {
  const router = useRouter();
  const params = useParams();

  const {
    data: jobOpeningDetail,
    error: errorJobOpeningDetail,
    isFetching: isFetchingJobOpeningDetail,
    isLoading: isLoadingJobOpeningDetail,
    status: statusJobOpeningDetail,
  } = useQuery<JobOpeningListData>({
    queryKey: ['job-opening-detail', params.jobOpeningId],
    queryFn: () => getJobOpeningApi(parseInt(params.jobOpeningId)),
  });


  return (
    <>
      {/* <div className="flex flex-col">
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
      </div> */}
      <CreateUpdateJobOpening jobOpeningData={jobOpeningDetail}/>
    </>
  );
};

export default UpdateJobOpening;
