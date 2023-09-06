import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// Define a reusable function for creating custom mutation hooks
export const customMutation = <TData, TVariables>(
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