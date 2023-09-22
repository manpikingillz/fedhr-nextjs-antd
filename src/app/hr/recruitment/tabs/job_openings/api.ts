import {
  JobOpeningCreateData,
  JobOpeningListData,
  JobOpeningUpdateData
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getJobOpeningListApi(): Promise<JobOpeningListData[]> {
  let endpoint = `job-opening/job-opening/`;
  return api(endpoint);
}

export async function createJobOpeningApi({
  data,
}: {
  data: JobOpeningCreateData;
}) {
  return api('job-opening/job-opening/', data);
}

export async function updateJobOpeningApi({
  data,
  id,
}: {
  data: JobOpeningUpdateData;
  id: number;
}) {
  return api(`job-opening/job-opening/${id}/`, data, 'put');
}

export async function deleteJobOpeningApi(id: number) {
  return api(`job-opening/job-opening/${id}/`, undefined, 'delete');
}

////////////////////////////////////////////////////////////////////////////

export async function getCourseListApi(): Promise<CourseListData[]> {
  let endpoint = `training/course/`;
  return api(endpoint);
}
