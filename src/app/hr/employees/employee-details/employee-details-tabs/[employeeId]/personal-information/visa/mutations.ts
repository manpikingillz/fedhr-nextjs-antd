import { createVisaInformationApi, deleteVisaInformationApi, updateVisaInformationApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateVisaInformationMutation = customMutation(createVisaInformationApi);
export const useUpdateVisaInformationMutation = customMutation(updateVisaInformationApi);
export const useDeleteVisaInformationMutation = customMutation(deleteVisaInformationApi);

