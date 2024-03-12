import { createCompensationApi, deleteCompensationApi, updateCompensationApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateCompensationMutation = customMutation(createCompensationApi);
export const useUpdateCompensationMutation = customMutation(updateCompensationApi);
export const useDeleteCompensationMutation = customMutation(deleteCompensationApi);
