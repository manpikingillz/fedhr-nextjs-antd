import { createAssetApi, deleteAssetApi, updateAssetApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateAssetMutation = customMutation(createAssetApi);
export const useUpdateAssetMutation = customMutation(updateAssetApi);
export const useDeleteAssetMutation = customMutation(deleteAssetApi);
