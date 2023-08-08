'use client';

import { DeleteOutlined, SnippetsFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { createNote, getNotes } from '@/app/api/notes'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Popconfirm,
  Row,
  Input,
} from 'antd';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image';

const { TextArea } = Input;

type Note = {
  note: string;
};

function Notes() {
  const [hideButton, setHideButton] = useState(true);

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

  const addNote = async ({ note }: Note) => {
    console.log('note data from form: ', note)
    noteMutation.mutate({ note, employee: 1 });
  };

  // Other functions
  const onFocus = () => {
    setHideButton(false);
  };

  const onCancel = () => {
    setHideButton(true);
  };

  if (errorNotes) return <h1> This is the error: {errorNotes.message}</h1>;
  return (
    <div>
      {/* Note create Form */}
      <br />
      <h2 className='text-emerald-500'>
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
                className='rounded-3xl'
              />
          </Col>
          <Col span={22}>
            <Form name="note-create-form" onFinish={addNote}>
              <Form.Item name="note" rules={[{ required: true, message: 'Write a note!' }]}>
                <TextArea onFocusCapture={onFocus} />
              </Form.Item>
              <Form.Item hidden={hideButton}>
                <Button htmlType="submit" type="primary">
                  Post
                </Button>
                <Button type="link" onClick={onCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
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
                    {/* {note.postedBy.firstName + ' ' + note.postedBy.lastName} */}
                    Gilbert Twesigomwe
                  </span>
                  <br />
                  <span style={{ color: 'lightgrey' }}>
                    {moment(note.created_at).format('ll')} at{' '}
                    {moment(note.created_at, 'hh:mm').format('hh:mm A')}
                  </span>
                  <br />
                  <span>{note.note}</span>
                </div>
              </Col>
              <Col span={1}>
                {/* <Icon type="edit" style={{ color: 'gray' }} /> &nbsp; */}
                <Popconfirm title="Sure to delete?" onConfirm={() => null}>
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
