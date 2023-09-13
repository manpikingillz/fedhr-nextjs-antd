import {
  VisaInformationCreateData,
  VisaInformationListData,
  VisaInformationUpdateData,
  VisaListData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getVisaInformationListApi(
  employeeId?: number
): Promise<VisaInformationListData[]> {
  let endpoint = `visa-informations/?employee=${employeeId}`;
  return api(endpoint);
}

export async function createVisaInformationApi({
  data,
}: {
  data: VisaInformationCreateData;
}) {
  return api('visa-informations/create/', data);
}

export async function updateVisaInformationApi({
  data,
  id,
}: {
  data: VisaInformationUpdateData;
  id: number;
}) {
  return api(`visa-informations/${id}/update/`, data);
}

export async function deleteVisaInformationApi(id: number) {
  return api(`visa-informations/${id}/delete/`, id);
}


export async function getVisasListApi(): Promise<
  VisaListData[]
> {
  let endpoint = `visa-informations/visas/`;
  return api(endpoint);
}