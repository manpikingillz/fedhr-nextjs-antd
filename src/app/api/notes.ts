import axios from '@/utils/axios';


export async function getNotes() {
  const response = await axios.get('notes/');
  return response.data;
}

export async function createNote(noteData: any) {
  const response = await axios.post('notes/create/', noteData);
  return response.data;
}

export async function updateNote({noteData, id}: {noteData: any, id: number}) {
  console.log('noteData: ', noteData)
  const response = await axios.post(`notes/${id}/update/`, {note: noteData, employee: 1});
  return response.data;
}

export async function deleteNote(id: number) {
  const response = await axios.post(`notes/${id}/delete/`, id);
  return response.data;
}
