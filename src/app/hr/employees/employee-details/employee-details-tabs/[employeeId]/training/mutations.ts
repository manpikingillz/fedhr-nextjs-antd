import { createTrainingApi, deleteTrainingApi, updateTrainingApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateTrainingMutation = customMutation(createTrainingApi);
export const useUpdateTrainingMutation = customMutation(updateTrainingApi);
export const useDeleteTrainingMutation = customMutation(deleteTrainingApi);
