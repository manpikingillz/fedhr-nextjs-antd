import {
  EmploymentType,
  JobOpeningCreateData,
  JobOpeningListData,
  JobOpeningUpdateData
} from '@/app/types/jop-opening-types';
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

export async function getEmploymentTypeListApi(): Promise<EmploymentType[]> {
  let endpoint = `job-opening/employment-type/`;
  return api(endpoint);
}
