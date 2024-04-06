import {
  EducationAwardListData,
  EducationCreateData,
  EducationListData,
  EducationUpdateData,
} from './types';
import { api } from '@/utils/api-utils';
import * as Parse from 'parse';

// Define your specific API endpoints
// export async function getEducationListApi(
//   employeeId?: number
// ): Promise<EducationListData[]> {
//   let endpoint = `educations/?employee=${employeeId}`;
//   return api(endpoint);
// }
export async function getEducationListApi(
  employeeId?: number
) {
  let educationList
  try {
  let query = new Parse.Query('Education')
  educationList = await query.find()
  console.log('educationList: ',educationList.map(item => item.toJSON()))
} catch (error: any) {
  console.error(error)
}
return educationList ? educationList.map(item => item.toJSON()) : [];
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
  let Employee = Parse.Object.extend('Education')
  let e = new Employee()
  console.log('saving to parse: ', e)
  console.log('saving to parse data: ', data)
  console.log('Saved: ',e.save(data))
  // return api('educations/create/', data);
}

export async function updateEducationApi({
  data,
  id,
}: {
  data: EducationUpdateData;
  id: number;
}) {
  return api(`educations/${id}/update/`, data);
}

export async function deleteEducationApi(id: number) {
  return api(`educations/${id}/delete/`, id);
}