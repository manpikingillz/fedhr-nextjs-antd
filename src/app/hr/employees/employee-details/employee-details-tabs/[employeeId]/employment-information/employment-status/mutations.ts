import { createEmploymentStatusApi, updateEmploymentStatusApi, deleteEmploymentStatusApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateEmploymentStatusMutation = customMutation(createEmploymentStatusApi);
export const useUpdateEmploymentStatusMutation = customMutation(updateEmploymentStatusApi);
export const useDeleteEmploymentStatusMutation = customMutation(deleteEmploymentStatusApi);

