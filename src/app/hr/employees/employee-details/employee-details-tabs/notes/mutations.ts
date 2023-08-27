
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
