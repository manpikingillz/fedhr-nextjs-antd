import {
  TrainingCreateData,
  TrainingListData,
  TrainingUpdateData,
  RelationshipListData,
  CourseListData,
} from './types';
import { api } from '@/utils/api-utils';

// Define your specific API endpoints
export async function getTrainingListApi(
  employeeId?: number
): Promise<TrainingListData[]> {
  let endpoint = `training/training/?employee=${employeeId}`;
  return api(endpoint);
}

export async function createTrainingApi({
  data,
}: {
  data: TrainingCreateData;
}) {
  return api('training/training/', data);
}

export async function updateTrainingApi({
  data,
  id,
}: {
  data: TrainingUpdateData;
  id: number;
}) {
  return api(`training/training/${id}/`, data, 'put');
}

export async function deleteTrainingApi(id: number) {
  return api(`training/training/${id}/`, undefined, 'delete');
}

////////////////////////////////////////////////////////////////////////////

export async function getCourseListApi(): Promise<CourseListData[]> {
  let endpoint = `training/course/`;
  return api(endpoint);
}
