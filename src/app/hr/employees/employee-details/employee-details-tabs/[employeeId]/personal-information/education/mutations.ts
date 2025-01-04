import { customMutation } from '@/utils/mutation-utils';
import { createEducationApi, deleteEducationApi, updateEducationApi } from './api';

export const useCreateEducationMutation = customMutation(createEducationApi);
export const useUpdateEducationMutation = customMutation(updateEducationApi);
export const useDeleteEducationMutation = customMutation(deleteEducationApi);

