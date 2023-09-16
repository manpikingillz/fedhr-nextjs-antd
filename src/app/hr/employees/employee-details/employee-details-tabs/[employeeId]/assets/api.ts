import {
  AssetCategoryListData,
  AssetCreateData,
  AssetListData,
  AssetUpdateData
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getAssetListApi(
  employeeId?: number
): Promise<AssetListData[]> {
  let endpoint = `asset/asset/?employee=${employeeId}`;
  return api(endpoint);
}

export async function createAssetApi({
  data,
}: {
  data: AssetCreateData;
}) {
  return api('asset/asset/', data);
}

export async function updateAssetApi({
  data,
  id,
}: {
  data: AssetUpdateData;
  id: number;
}) {
  return api(`asset/asset/${id}/`, data, 'put');
}

export async function deleteAssetApi(id: number) {
  return api(`asset/asset/${id}/`, undefined, 'delete');
}

////////////////////////////////////////////////////////////////////////////

export async function getAssetCategoryListApi(): Promise<AssetCategoryListData[]> {
  let endpoint = `asset/asset-category/`;
  return api(endpoint);
}
