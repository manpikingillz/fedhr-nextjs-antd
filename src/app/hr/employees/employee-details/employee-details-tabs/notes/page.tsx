'use client';

import { DeleteOutlined, SnippetsFilled, EditTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import { Card, Col, Divider, Popconfirm, Row } from 'antd';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image';
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from './mutations';
import { NoteListData } from './types';
import { getNotesApi } from './api';
import NoteForm from './NoteForm';

//TODO: Consider improvements https://chat.openai.com/c/7e3596f5-cfc0-41c4-be12-3103cb221f4e
// on making the code in this file cleaner.

function Notes() {
  // LOCAL STATE ==================================================

  // UI states
  const [isButtonHiddenCreateNote, setIsButtonHiddenCreateNote] =
    useState(true);
  const [isButtonHiddenUpdateNote, setIsButtonHiddenUpdateNote] =
    useState(true);

  // Note selection and editing states
  const [noteselectedForUpdate, setNoteselectedForUpdate] = useState<number>();
  const [noteToUpdate, setNoteToUpdate] = useState<NoteListData>();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: notes,
    error: errorNotes,
    isFetching: isFetchingNotes,
    isLoading: isLoadingNotes,
    status: statusNotes,
  } = useQuery<NoteListData[]>({ queryKey: ['notes'], queryFn: getNotesApi });

  // MUTATIONS ////////////////////////////////////
  const queryClient = useQueryClient();

  // CREATE MUTATION ========================================
  const onSuccessNoteCreate = () => {
    queryClient.refetchQueries(['notes']);
  };

  const onErrorNoteCreate = (error: any) => {
    // Handle Error
    console.log('An error ocurred while creating note: ', error)
  };

  const createNoteMutation = useCreateNoteMutation(
    onSuccessNoteCreate,
    onErrorNoteCreate
  );

  const createNote = async ({ note }: { note: string }) => {
    const data = {
      note: note,
      employee: 1, //get from selected employee
    };

    createNoteMutation.mutate(data);
  };

  // UPDATE NOTE ========================================
  const onSuccessNoteUpdate = () => {
    setNoteselectedForUpdate(0);
    queryClient.refetchQueries(['notes']);
  };

  const onErrorNoteUpdate = () => {
    // Handle Error
  };

  const updateNoteMutation = useUpdateNoteMutation(
    onSuccessNoteUpdate,
    onErrorNoteUpdate
  );

  const updateNote = async ({ note }: { note: string }) => {
    // the ! after noteToUpdate means we are sure noteToUpdate
    // is non null. Means there is no situation where its null or undefined when
    // we're accessing it.
    // This helped solve the - is possibly 'undefined'.ts(18048) error where
    // noteToUpdate was underlined by typescript
    const data = {
      note: note,
      employee: noteToUpdate!.employee.id,
    };

    updateNoteMutation.mutate({ data, id: noteToUpdate!.id });
  };

  // DELETE MUTATION ====================================
  const onSuccessNoteDelete = () => {
    queryClient.refetchQueries(['notes']);
  };

  const onErrorNoteDelete = () => {
    // Handle Error
  };

  const deleteNoteMutation = useDeleteNoteMutation(
    onSuccessNoteDelete,
    onErrorNoteDelete
  );

  const deleteNote = async (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  // OTHER FUNCTIONS
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
    setNoteselectedForUpdate(0);
  };

  const showEditForm = (note: NoteListData) => {
    setNoteselectedForUpdate(note.id);
    setIsButtonHiddenUpdateNote(false);
    setNoteToUpdate(note);
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
                formName="note-create-form"
                saveNoteHandler={createNote}
                onFocusHandler={onFocusCreateNote}
                isButtonHidden={isButtonHiddenCreateNote}
                onCancelHandler={onCancelCreateNote}
              />
            }
          </Col>
        </Row>
      </Card>

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
                  {noteselectedForUpdate == note.id ? (
                    ''
                  ) : (
                    <span>{note.note}</span>
                  )}
                </div>

                {noteselectedForUpdate == note.id && (
                  <NoteForm
                    formName={`note-update-form-${note.id}`}
                    saveNoteHandler={updateNote}
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
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => deleteNote(note.id)}
                >
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