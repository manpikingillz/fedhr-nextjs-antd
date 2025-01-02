import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// Define a reusable function for creating custom mutation hooks
export const customMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) => {
  return (
    onSuccessCallback?: () => void,
    onErrorCallback?: (error: any) => void
  ) => {
    return useMutation({
      mutationFn,
      onError: onErrorCallback,
      onSuccess: onSuccessCallback,
      ...options,
    });
  };
};