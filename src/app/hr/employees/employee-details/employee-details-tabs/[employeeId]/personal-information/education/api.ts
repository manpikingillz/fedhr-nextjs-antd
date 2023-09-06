import { EducationListData } from './types';
import { api } from '@/utils/api-utils';

  // Define your specific API endpoints
  export async function getEducationListApi(
    employeeId?: number
  ): Promise<EducationListData[]> {
    let endpoint = `educations/?employee=${employeeId}`;
    return api(endpoint);
  }
