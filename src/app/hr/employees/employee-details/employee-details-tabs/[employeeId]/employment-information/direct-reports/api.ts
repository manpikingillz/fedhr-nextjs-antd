import {
  DirectReportEmployeeData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getDirectReportsListApi(
  employeeId?: number
): Promise<DirectReportEmployeeData[]> {
  let endpoint = `job-information/job-information/get_direct_reports/?reports_to_id=${employeeId}`;
  return api(endpoint);
}
