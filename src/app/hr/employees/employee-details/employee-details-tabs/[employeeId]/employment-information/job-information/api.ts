import {
  DepartmentListData,
  DivisionListData,
  JobInformationCreateData,
  JobInformationListData,
  JobInformationUpdateData,
  JobListData,
  LocationListData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getJobInformationListApi(
  employeeId?: number
): Promise<JobInformationListData[]> {
  let endpoint = `job-information/job-information/?employee=${employeeId}`;
  return api(endpoint);
}

export async function createJobInformationApi({
  data,
}: {
  data: JobInformationCreateData;
}) {
  return api('job-information/job-information/', data);
}

export async function updateJobInformationApi({
  data,
  id,
}: {
  data: JobInformationUpdateData;
  id: number;
}) {
  return api(`job-information/job-information/${id}/`, data, 'put');
}

export async function deleteJobInformationApi(id: number) {
  return api(`job-information/job-information/${id}/`, undefined, 'delete');
}

////////////////////////////////////////////////////////////////////////////

export async function getLocationListApi(): Promise<LocationListData[]> {
  let endpoint = `job-information/location/`;
  return api(endpoint);
}

export async function getDivisionListApi(): Promise<DivisionListData[]> {
  let endpoint = `job-information/division/`;
  return api(endpoint);
}

export async function getDepartmentListApi(): Promise<DepartmentListData[]> {
  let endpoint = `job-information/department/`;
  return api(endpoint);
}

export async function getJobListApi(): Promise<JobListData[]> {
  let endpoint = `job-information/job/`;
  return api(endpoint);
}
