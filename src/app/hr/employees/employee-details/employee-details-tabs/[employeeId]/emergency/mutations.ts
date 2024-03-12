import { createEmergencyContactApi, deleteEmergencyContactApi, updateEmergencyContactApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateEmergencyContactMutation = customMutation(createEmergencyContactApi);
export const useUpdateEmergencyContactMutation = customMutation(updateEmergencyContactApi);
export const useDeleteEmergencyContactMutation = customMutation(deleteEmergencyContactApi);
