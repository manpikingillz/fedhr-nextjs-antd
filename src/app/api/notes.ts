import axios from '@/utils/axios';

export async function getNotes() {
  const response = await axios.get('notes/');
  return response.data;
}

export async function createNote(noteData: any) {
  const response = await axios.post('notes/create/', noteData);
  return response.data;
}

export async function updateNote(noteData: any, id: number) {
  const response = await axios.post(`notes/${id}/update/`, noteData);
  return response.data;
}

export async function deleteNote(id: number) {
  const response = await axios.post(`notes/${id}/delete/`, id);
  return response.data;
}
