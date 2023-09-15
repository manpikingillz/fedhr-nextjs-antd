import {
  EmergencyContactCreateData,
  EmergencyContactListData,
  EmergencyContactUpdateData,
  RelationshipListData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getEmergencyContactListApi(
  employeeId?: number
): Promise<EmergencyContactListData[]> {
  let endpoint = `emergency-contact/emergency-contact/?employee=${employeeId}`;
  return api(endpoint);
}

export async function createEmergencyContactApi({
  data,
}: {
  data: EmergencyContactCreateData;
}) {
  return api('emergency-contact/emergency-contact/', data);
}

export async function updateEmergencyContactApi({
  data,
  id,
}: {
  data: EmergencyContactUpdateData;
  id: number;
}) {
  return api(`emergency-contact/emergency-contact/${id}/`, data, 'put');
}

export async function deleteEmergencyContactApi(id: number) {
  return api(`emergency-contact/emergency-contact/${id}/`, undefined, 'delete');
}

////////////////////////////////////////////////////////////////////////////

export async function getRelationshipListApi(): Promise<RelationshipListData[]> {
  let endpoint = `emergency-contact/relationship/`;
  return api(endpoint);
}
