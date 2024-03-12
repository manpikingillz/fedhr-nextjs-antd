import { createNoteApi, deleteNoteApi, updateNoteApi } from './api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateNoteMutation = customMutation(createNoteApi);
export const useUpdateNoteMutation = customMutation(updateNoteApi);
export const useDeleteNoteMutation = customMutation(deleteNoteApi);

// This is the boiler plate we would have if we didn't create customMutation

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




