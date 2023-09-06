import { createEducationApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateEducationMutation = customMutation(createEducationApi);

