// Matches data from endpoint
export type NoteListData = {
  id: number;
  note: string;
  created_at: Date
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
};

export type NotesData = {
  limit: number,
  offset: number,
  count: number,
  next: string,
  previous: string,
  results: NoteListData[]
};

export type NoteUpdateData = {
  note: string;
  employee: number;
}

export type NoteCreateData = {
  note: string;
  employee: number;
}

export type NoteFormProps = {
  formName: string
  saveNoteHandler: any;
  onFocusHandler?: any;
  isButtonHidden?: boolean;
  onCancelHandler?: any;
  note?: string;
  isUpdate?: boolean
}