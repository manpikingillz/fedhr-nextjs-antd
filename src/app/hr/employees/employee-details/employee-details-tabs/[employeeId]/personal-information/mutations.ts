import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateEmployeeApi } from './api';


// Define a reusable function for creating custom mutation hooks
const customEmployeeMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData>
) => {
  return (
    onSuccessCallback?: () => void,
    onErrorCallback?: (error: any) => void
  ) => {
    const mutation = useMutation(mutationFn, {
      onError: onErrorCallback,
      onSuccess: onSuccessCallback,
      ...options, // You can pass additional mutation options here
    });

    return mutation;
  };
};

// Create custom mutation hooks using the reusable function
export const useUpdateEmployeeMutation = customEmployeeMutation(updateEmployeeApi);
