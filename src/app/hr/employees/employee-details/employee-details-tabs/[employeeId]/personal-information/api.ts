import { EmployeeDetail, EmployeeUpdateData } from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getEmployeeApi(id?: number): Promise<EmployeeDetail> {
  let endpoint = `employees/${id}/`;
  return api(endpoint);
}

export async function updateEmployeeApi(
  {data, id}: {data: EmployeeUpdateData, id: number}
): Promise<any> {
  let endpoint = `employees/${id}/update/`;
  return api(endpoint, data);
}
