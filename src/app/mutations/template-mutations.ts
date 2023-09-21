import { createTemplateApi, deleteTemplateApi, updateTemplateApi } from '@/app/api/template-api';
import { customMutation } from '@/utils/mutation-utils';

// Create custom mutation hooks using the reusable function
export const useCreateTemplateMutation = customMutation(createTemplateApi);
export const useUpdateTemplateMutation = customMutation(updateTemplateApi);
export const useDeleteTemplateMutation = customMutation(deleteTemplateApi);
