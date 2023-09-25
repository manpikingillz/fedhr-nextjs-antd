import { createJobOpeningApi, deleteJobOpeningApi, updateJobOpeningApi } from '@/app/api/job-opening-api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateJobOpeningMutation = customMutation(createJobOpeningApi);
export const useUpdateJobOpeningMutation = customMutation(updateJobOpeningApi);
export const useDeleteJobOpeningMutation = customMutation(deleteJobOpeningApi);
