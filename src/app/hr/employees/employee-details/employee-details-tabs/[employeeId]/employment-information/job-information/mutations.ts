import { createJobInformationApi, deleteJobInformationApi, updateJobInformationApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateJobInformationMutation = customMutation(createJobInformationApi);
export const useUpdateJobInformationMutation = customMutation(updateJobInformationApi);
export const useDeleteJobInformationMutation = customMutation(deleteJobInformationApi);
