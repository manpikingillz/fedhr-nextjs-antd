'use client';

import { DeleteOutlined, CopyOutlined, EditTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Divider,
  Form,
  Pagination,
  Popconfirm,
  Row,
  Skeleton,
  Input,
  Empty,
  Typography,
} from 'antd';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image';
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from './mutations';
import { NoteListData, NotePaginatedListData } from './types';
import { getNoteListApi } from './api';
import NoteForm from './NoteForm';
import { useParams } from 'next/navigation';
import ErrorPage from '@/app/error/errorPage';

//TODO: Consider improvements https://chat.openai.com/c/7e3596f5-cfc0-41c4-be12-3103cb221f4e
// on making the code in this file cleaner.

//TODO: Make sure filtering works.

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
  const [noteSearch, setNoteSearch] = useState<string | undefined>(undefined);

  // Pagination states
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Form hooks
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  // Router hooks
  const params = useParams();

  const limit = 5;
  const { Search } = Input;

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: notes,
    error: errorNotes,
    isFetching: isFetchingNotes,
    isLoading: isLoadingNotes,
    status: statusNotes,
    refetch,
  } = useQuery<NotePaginatedListData>({
    //currentPage is so that we can have unique cache key since
    //queryKey is used for caching as well.
    queryKey: ['notes', currentPage],
    queryFn: () => getNoteListApi(limit, offset, noteSearch, parseInt(params.employeeId)),
  });

  // MUTATIONS ////////////////////////////////////
  const queryClient = useQueryClient();

  // CREATE MUTATION ========================================
  const onSuccessNoteCreate = () => {
    queryClient.refetchQueries(['notes']);
  };

  const onErrorNoteCreate = (error: any) => {
    // Handle Error
  };

  const createNoteMutation = useCreateNoteMutation(
    onSuccessNoteCreate,
    onErrorNoteCreate
  );

  const createNote = async ({ note }: { note: string }) => {
    const data = {
      note: note,
      employee: parseInt(params.employeeId), //get from selected employee
    };

    createNoteMutation.mutate(data);
    createForm.resetFields();
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

  // Pagination method
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const _offset = (page - 1) * limit;
    setOffset(_offset);
  };

  // Search
  const onSearchHandler = (event: any) => {
    setNoteSearch(event);
  };

  useEffect(() => {
    if (noteSearch !== undefined) {
      refetch();
    }
  }, [noteSearch]);

  return (
    <div>
      <CopyOutlined className='text-2xl ml-4 text-blue-600'/>
      <Typography.Text className='text-2xl ml-4 text-blue-600'> Notes </Typography.Text>
      <Divider className='mt-2'/>

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
                formInstance={createForm}
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

      <Search
        placeholder="Search Notes"
        className="pt-3"
        onSearch={(event) => onSearchHandler(event)}
        showCount
      />

      {errorNotes ? (
        <ErrorPage error={errorNotes} />
      ) : (
        <Skeleton
          loading={isLoadingNotes || isFetchingNotes}
          active
          avatar
          className="py-3"
        >
          {notes?.count ? (
            <div>
              <Card
                style={{ backgroundColor: '#fffff', borderColor: '#ffffff' }}
              >
                {notes?.results.map((note) => (
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
                            {note.employee?.first_name +
                              ' ' +
                              note.employee?.last_name}
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
                            formInstance={updateForm}
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
              <Pagination
                current={currentPage}
                total={notes?.count || 0}
                pageSize={limit}
                onChange={(page) => onPageChange(page)}
              />
            </div>
          ) : (
            <Empty className="pt-3" />
          )}
        </Skeleton>
      )}
    </div>
  );
}

export default Notes;
