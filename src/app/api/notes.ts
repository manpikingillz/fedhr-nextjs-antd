import axios from '@/utils/axios';

interface Note {
  id?: number,
  note: string,
  employee?: number
}

export async function getNotes() {
  const response = await axios.get('notes/');
  console.log('notes response: ', response)
  return response.data;
}

export async function createNote(noteData: any) {
  const response = await axios.post('notes/create/', noteData);
  return response.data;
}

export async function updateNote({noteData, id}: {noteData: Note, id: number}) {
  console.log('noteData: ', noteData, id)
  const response = await axios.post(`notes/${id}/update/`, noteData);
  return response.data;
}

export async function deleteNote(id: number) {
  const response = await axios.post(`notes/${id}/delete/`, id);
  return response.data;
}
