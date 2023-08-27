
import { useMutation } from '@tanstack/react-query';
import { createNoteApi, deleteNoteApi, updateNoteApi } from './api';


export const useCreateNoteMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: any) => void
) => {
  const mutation = useMutation(createNoteApi, {
    onError: (err) => {
      if (onErrorCallback) {
        onErrorCallback(err);
      }
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};

export const useUpdateNoteMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: any) => void
) => {
  const mutation = useMutation(updateNoteApi, {
    onError: (err) => {
      if (onErrorCallback) {
        onErrorCallback(err);
      }
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation
};

export const useDeleteNoteMutation = (
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: any) => void
) => {
  const mutation = useMutation(deleteNoteApi, {
    onError: (err) => {
      if (onErrorCallback) {
        onErrorCallback(err);
      }
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return mutation;
};


// TODO: Reduce the repetitiveness of the above code by doing something like the below;
// I believe it will reduce the amount of code needed

// import { useMutation, UseMutationOptions } from 'react-query';

// // Define a reusable function for creating custom mutation hooks
// const createCustomMutation = <TData>(
//   mutationFn: () => Promise<TData>,
//   options?: UseMutationOptions<TData>
// ) => {
//   return (
//     onSuccessCallback?: () => void,
//     onErrorCallback?: (error: any) => void
//   ) => {
//     const mutation = useMutation(mutationFn, {
//       onError: (err) => {
//         if (onErrorCallback) {
//           onErrorCallback(err);
//         }
//       },
//       onSuccess: () => {
//         if (onSuccessCallback) {
//           onSuccessCallback();
//         }
//       },
//       ...options, // You can pass additional mutation options here
//     });

//     return mutation;
//   };
// };

// // Create custom mutation hooks using the reusable function
// export const useCreateNoteMutation = createCustomMutation(createNoteApi);
// export const useUpdateNoteMutation = createCustomMutation(updateNoteApi);
// export const useDeleteNoteMutation = createCustomMutation(deleteNoteApi);
