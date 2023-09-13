import { EmployeeListData } from '../employee-details/employee-details-tabs/[employeeId]/personal-information/types';
import { api } from '@/utils/api-utils';


// Define your specific API endpoints
export async function getEmployeeListApi(): Promise<EmployeeListData> {
  let endpoint = `employees/`;
  return api(endpoint);
}
