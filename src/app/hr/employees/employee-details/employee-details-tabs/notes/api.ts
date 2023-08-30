import axios from '@/utils/axios';
import { NoteCreateData, NoteListData, NoteUpdateData, NotesData } from './types';
import { AxiosResponse } from 'axios';

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

//********* Add some re-usability */

// Define a generic API function that takes the endpoint and data as arguments
async function api<T>(endpoint: string, data?: T) {
  try {
    const response: AxiosResponse<T> = await axios({
      method: data ? 'post' : 'get', // Use 'post' for endpoints that require data
      url: endpoint,
      data, // Include data if provided
    });
    if (response.config.method == 'get') {
      console.log('log notes data: ', response.data)
    }
    return response.data;
  } catch (error) {
    // Handle errors, log them, or throw custom exceptions
    throw error;
  }
}

// Define your specific API endpoints

export async function getNotesApi(limit: number, offset: number): Promise<NotesData> {
  const endpoint = `notes/?limit=${limit}&offset=${offset}`;
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
