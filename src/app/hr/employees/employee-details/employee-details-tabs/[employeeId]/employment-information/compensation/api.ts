import {
  CompensationCreateData,
  CompensationListData,
  CompensationUpdateData,
  CurrencyListData,
  ChangeReasonListData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getCompensationListApi(
  employeeId?: number
): Promise<CompensationListData[]> {
  let endpoint = `compensation/compensation/?employee=${employeeId}`;
  return api(endpoint);
}

export async function createCompensationApi({
  data,
}: {
  data: CompensationCreateData;
}) {
  return api('compensation/compensation/', data);
}

export async function updateCompensationApi({
  data,
  id,
}: {
  data: CompensationUpdateData;
  id: number;
}) {
  return api(`compensation/compensation/${id}/`, data, 'put');
}

export async function deleteCompensationApi(id: number) {
  return api(`compensation/compensation/${id}/`, undefined, 'delete');
}

////////////////////////////////////////////////////////////////////////////

export async function getCurrencyListApi(): Promise<CurrencyListData[]> {
  let endpoint = `compensation/currency/`;
  return api(endpoint);
}

export async function getChangeReasonListApi(): Promise<ChangeReasonListData[]> {
  let endpoint = `compensation/change-reason/`;
  return api(endpoint);
}
