import {
  EmploymentStatusCreateData,
  EmploymentStatusListData,
  EmploymentStatusTypeListData,
  EmploymentStatusUpdateData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getEmploymentStatusListApi(
  employeeId?: number
): Promise<EmploymentStatusListData[]> {
  let endpoint = `employment-status/employment-status/?employee=${employeeId}`;
  return api(endpoint);
}

export async function getEmploymentStatusTypeListApi(): Promise<
  EmploymentStatusTypeListData[]
> {
  let endpoint = `employment-status/employment-status-type/`;
  return api(endpoint);
}

export async function createEmploymentStatusApi({
  data
}: {
  data: EmploymentStatusCreateData;
}) {
  return api('employment-status/employment-status/', data);
}

export async function updateEmploymentStatusApi({
  data,
  id,
}: {
  data: EmploymentStatusUpdateData;
  id: number;
}) {
  return api(`employment-status/employment-status/${id}/`, data);
}

export async function deleteEmploymentStatusApi(id: number) {
  return api(`employment-status/employment-status/${id}/`);
}