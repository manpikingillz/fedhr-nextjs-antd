import { VisaInformationListData } from './types';
import { api } from '@/utils/api-utils';


  // Define your specific API endpoints
  export async function getVisaInformationListApi(
    employeeId?: number
  ): Promise<VisaInformationListData[]> {
    let endpoint = `visa_informations/?employee=${employeeId}`;
    return api(endpoint);
  }
