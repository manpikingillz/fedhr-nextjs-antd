import axios from '@/utils/axios';

export async function getNotes() {
  const response = await axios.get('notes/');
  return response.data;
}

export async function createNote(noteData: any) {
  const response = await axios.post('notes/create/', noteData);
  return response.data;
}
