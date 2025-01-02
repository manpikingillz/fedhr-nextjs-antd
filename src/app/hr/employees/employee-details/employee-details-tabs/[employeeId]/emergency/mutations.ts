import { customMutation } from '@/utils/mutation-utils';
import { createEmergencyContactApi, deleteEmergencyContactApi, updateEmergencyContactApi } from './api';

/**
 * Custom mutation hooks for managing emergency contacts.
 * These hooks provide create, update and delete functionality for emergency contacts,
 * with built-in error and success callback handling.
 */
export const useCreateEmergencyContactMutation = customMutation(createEmergencyContactApi);
export const useUpdateEmergencyContactMutation = customMutation(updateEmergencyContactApi);
export const useDeleteEmergencyContactMutation = customMutation(deleteEmergencyContactApi);
