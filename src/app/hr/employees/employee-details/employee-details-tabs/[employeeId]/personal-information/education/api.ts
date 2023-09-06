import {
  EducationAwardListData,
  EducationCreateData,
  EducationListData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getEducationListApi(
  employeeId?: number
): Promise<EducationListData[]> {
  let endpoint = `educations/?employee=${employeeId}`;
  return api(endpoint);
}

export async function getEducationAwardListApi(): Promise<
  EducationAwardListData[]
> {
  let endpoint = `educations/education_awards/`;
  return api(endpoint);
}

export async function createEducationApi({
  data
}: {
  data: EducationCreateData;
}) {
  return api('educations/create/', data);
}
