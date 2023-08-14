'use client';

import { DeleteOutlined, SnippetsFilled, EditTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { createNote, getNotes, updateNote, deleteNote } from '@/app/api/notes';
import { Button, Card, Col, Divider, Form, Popconfirm, Row, Input } from 'antd';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image';
import NoteForm from '@/app/components/NoteForm';

const { TextArea } = Input;

type Note = {
  note: string;
  id: number,
  employee: {
    id?: number;
    first_name?: string;
    last_name?: string
  }
};

function Notes() {
  const [isButtonHiddenCreateNote, setIsButtonHiddenCreateNote] =
    useState(true);
  const [isButtonHiddenUpdateNote, setIsButtonHiddenUpdateNote] =
    useState(true);
  const [noteselectedForUpdate, setNoteselectedForUpdate] = useState<number>();
  const [theNote, setTheNote] = useState<Note>()

  // Fetch Notes
  const {
    data: notes,
    error: errorNotes,
    isFetching: isFetchingNotes,
    isLoading: isLoadingNotes,
    status: statusNotes,
  } = useQuery({ queryKey: ['notes'], queryFn: getNotes });

  // Note Mutation
  const queryClient = useQueryClient();
  const noteMutation = useMutation(createNote, {
    onError: () => {
      // What to do when an error occurs
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('notes');
    },
  });

  const noteUpdateMutation = useMutation(updateNote, {
    onError: () => {
      // What to do when an error occurs
    },
    onSuccess: () => {
      // Invalidate and refetch
      setNoteselectedForUpdate(0)
      queryClient.invalidateQueries('notes');
    },
  });

  const noteDeleteMutation = useMutation(deleteNote, {
    onError: () => {
      // What to do when an error occurs
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('notes');
    },
  });

  const addNote = async ({ note }: Note) => {
    noteMutation.mutate({ note, employee: 1 });
  };

  const updateTheNote = async ({ note }: Note) => {
    const noteData = {
      'note': note,
      'employee': theNote?.employee.id
    }
    noteUpdateMutation.mutate({ noteData, id: noteselectedForUpdate });
  };
  const deleteTheNote = async (id: number) => {
    noteDeleteMutation.mutate(id);
  };

  // Other functions
  const onFocusCreateNote = () => {
    setIsButtonHiddenCreateNote(false);
  };

  const onCancelCreateNote = () => {
    setIsButtonHiddenCreateNote(true);
  };

  const onFocusUpdateNote = () => {
    setIsButtonHiddenUpdateNote(false);
  };

  const onCancelUpdateNote = () => {
    setIsButtonHiddenUpdateNote(true);
    setNoteselectedForUpdate(0)
  };

  const showEditForm = (note: Note) => {
    setNoteselectedForUpdate(note.id)
    setIsButtonHiddenUpdateNote(false)
    setTheNote(note)
  };

  if (errorNotes) return <h1> This is the error: {errorNotes.message}</h1>;
  return (
    <div>
      {/* Note create Form */}
      <br />
      <h2 className="text-emerald-500">
        <SnippetsFilled />
        &nbsp;Notes
      </h2>
      <br />

      <Card style={{ backgroundColor: '#f5f5f5', borderColor: '#f5f5f5' }}>
        <Row>
          <Col span={2}>
            <Image
              src="/images/user_profile.jpg"
              alt="User Avatar"
              height={50}
              width={50}
              className="rounded-3xl"
            />
          </Col>
          <Col span={22}>
            {
              <NoteForm
                formName='note-create-form'
                saveNoteHandler={addNote}
                onFocusHandler={onFocusCreateNote}
                isButtonHidden={isButtonHiddenCreateNote}
                onCancelHandler={onCancelCreateNote}
              />
            }
          </Col>
        </Row>
      </Card>

      {/* Notes List */}
      <Card style={{ backgroundColor: '#fffff', borderColor: '#ffffff' }}>
        {notes?.map((note) => (
          <div key={note.id}>
            <Row>
              <Col span={2}>
                <Image
                  src="/images/user_profile.jpg"
                  alt="User Avatar"
                  height={50}
                  width={50}
                />
              </Col>
              <Col span={21}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>
                    {note.employee?.first_name + ' ' + note.employee?.last_name}
                  </span>
                  <br />
                  <span style={{ color: 'lightgrey' }}>
                    {moment(note.created_at).format('ll')} at{' '}
                    {moment(note.created_at, 'hh:mm').format('hh:mm A')}
                  </span>
                  <br />
                  {
                    noteselectedForUpdate == note.id ? '': <span>{note.note}</span>
                  }
                </div>

                {noteselectedForUpdate == note.id && (
                  <NoteForm
                    formName={`note-update-form-${note.id}`}
                    saveNoteHandler={updateTheNote}
                    onFocusHandler={onFocusUpdateNote}
                    isButtonHidden={isButtonHiddenUpdateNote}
                    onCancelHandler={onCancelUpdateNote}
                    note={note.note}
                    isUpdate={true}
                  />
                )}
              </Col>
              <Col span={1} className="space-x-2">
                <EditTwoTone
                  className="cursor-pointer"
                  onClick={() => showEditForm(note)}
                />
                <Popconfirm title="Sure to delete?" onConfirm={() => deleteTheNote(note.id)}>
                  <a href="javascript:;">
                    <DeleteOutlined />
                  </a>
                </Popconfirm>
              </Col>
            </Row>
            <Divider />
          </div>
        ))}
      </Card>
    </div>
  );
}

export default Notes;
