import axios from '@/utils/axios';
import { NoteCreateData, NoteUpdateData } from './types';


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
    const response = await axios({
      method: data ? 'post' : 'get', // Use 'post' for endpoints that require data
      url: endpoint,
      data, // Include data if provided
    });
    return response.data;
  } catch (error) {
    // Handle errors, log them, or throw custom exceptions
    throw error;
  }
}

// Define your specific API endpoints

export async function getNotesApi() {
  return api('notes/');
}

export async function createNoteApi(data: NoteCreateData) {
  return api('notes/create/', data);
}

export async function updateNoteApi({ data, id }: { data: NoteUpdateData; id: number }) {
  return api(`notes/${id}/update/`, data);
}

export async function deleteNoteApi(id: number) {
  return api(`notes/${id}/delete/`, id);
}
