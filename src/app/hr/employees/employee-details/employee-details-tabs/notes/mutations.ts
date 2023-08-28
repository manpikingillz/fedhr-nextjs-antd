import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createNoteApi, deleteNoteApi, updateNoteApi } from './api';


// export const useCreateNoteMutation = (
//   onSuccessCallback?: () => void,
//   onErrorCallback?: (error: any) => void
// ) => {
//   const mutation = useMutation(createNoteApi, {
//     onError: (err) => {
//       if (onErrorCallback) {
//         onErrorCallback(err);
//       }
//     },
//     onSuccess: () => {
//       if (onSuccessCallback) {
//         onSuccessCallback();
//       }
//     },
//   });

//   return mutation;
// };

// export const useUpdateNoteMutation = (
//   onSuccessCallback?: () => void,
//   onErrorCallback?: (error: any) => void
// ) => {
//   const mutation = useMutation(updateNoteApi, {
//     onError: (err) => {
//       if (onErrorCallback) {
//         onErrorCallback(err);
//       }
//     },
//     onSuccess: () => {
//       if (onSuccessCallback) {
//         onSuccessCallback();
//       }
//     },
//   });

//   return mutation
// };

// export const useDeleteNoteMutation = (
//   onSuccessCallback?: () => void,
//   onErrorCallback?: (error: any) => void
// ) => {
//   const mutation = useMutation(deleteNoteApi, {
//     onError: (err) => {
//       if (onErrorCallback) {
//         onErrorCallback(err);
//       }
//     },
//     onSuccess: () => {
//       if (onSuccessCallback) {
//         onSuccessCallback();
//       }
//     },
//   });

//   return mutation;
// };


// Define a reusable function for creating custom mutation hooks
const customNoteMutation = <TData, TVariables>(
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
export const useCreateNoteMutation = customNoteMutation(createNoteApi);
export const useUpdateNoteMutation = customNoteMutation(updateNoteApi);
export const useDeleteNoteMutation = customNoteMutation(deleteNoteApi);
