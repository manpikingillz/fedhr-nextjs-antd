import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateEmployeeApi } from './api';
import { customMutation } from '@/utils/mutation-utils';


// Create custom mutation hooks using the reusable function
export const useUpdateEmployeeMutation = customMutation(updateEmployeeApi);
