import {
  NoteCreateData,
  NotePaginatedListData,
  NoteUpdateData,
} from './types';
import { api } from '@/utils/api-utils';


// Define your specific API endpoints
export async function getNoteListApi(
  limit: number,
  offset: number,
  noteSearch?: string,
  employeeId?: number
): Promise<NotePaginatedListData> {
  let endpoint = `notes/?limit=${limit}&offset=${offset}`;
  if (noteSearch) endpoint = endpoint + `&note=${noteSearch}`
  if (employeeId) endpoint = endpoint + `&employee=${employeeId}`

  return api(endpoint);
}

export async function createNoteApi(data: NoteCreateData) {
  return api('notes/create/', data);
}

export async function updateNoteApi({
  data,
  id,
}: {
  data: NoteUpdateData;
  id: number;
}) {
  return api(`notes/${id}/update/`, data);
}

export async function deleteNoteApi(id: number) {
  return api(`notes/${id}/delete/`, id);
}


// The boiler plate we would have if we didn't create api util

// export async function getNotesApi() {
//   const response = await axios.get('notes/');
//   return response.data;
// }

// export async function createNoteApi(data: NoteCreateData) {
//   const response = await axios.post('notes/create/', data);
//   return response.data;
// }

// export async function updateNoteApi({data, id}: {data: NoteUpdateData, id: number}) {
//   const response = await axios.post(`notes/${id}/update/`, data);
//   return response.data;
// }

// export async function deleteNoteApi(id: number) {
//   const response = await axios.post(`notes/${id}/delete/`, id);
//   return response.data;
// }