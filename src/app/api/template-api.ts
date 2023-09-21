import {
    TemplateCreateData,
    TemplateListData,
    TemplateUpdateData,
  } from '@/app/types/template-types';
  import { api } from '@/utils/api-utils';

  // Define your specific API endpoints
  export async function getTemplateListApi(): Promise<TemplateListData[]> {
    let endpoint = `template/template/`;
    return api(endpoint);
  }

  export async function getTemplateApi(id: number): Promise<TemplateListData[]> {
    let endpoint = `template/template/${id}/`;
    return api(endpoint);
  }

  export async function createTemplateApi({
    data,
  }: {
    data: TemplateCreateData;
  }) {
    return api('template/template/', data);
  }

  export async function updateTemplateApi({
    data,
    id,
  }: {
    data: TemplateUpdateData;
    id: number;
  }) {
    return api(`template/template/${id}/`, data, 'put');
  }

  export async function deleteTemplateApi(id: number) {
    return api(`template/template/${id}/`, undefined, 'delete');
  }