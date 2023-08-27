import axios from '@/utils/axios';
import { NoteCreateData, NoteUpdateData } from './types';


export async function getNotesApi() {
  const response = await axios.get('notes/');
  return response.data;
}

export async function createNoteApi(data: NoteCreateData) {
  const response = await axios.post('notes/create/', data);
  return response.data;
}

export async function updateNoteApi({data, id}: {data: NoteUpdateData, id: number}) {
  const response = await axios.post(`notes/${id}/update/`, data);
  return response.data;
}

export async function deleteNoteApi(id: number) {
  const response = await axios.post(`notes/${id}/delete/`, id);
  return response.data;
}
