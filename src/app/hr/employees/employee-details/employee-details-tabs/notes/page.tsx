'use client';

import { DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Card, Col, Collapse, Divider, Popconfirm, Row } from 'antd';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image'

function Notes() {

  async function getNotes() {
    const response = await axios.get('notes/')
    return response.data
  }

  const {
    data: notes,
    error: errorNotes,
    isFetching: isFetchingNotes,
    isLoading: isLoadingNotes,
    status: statusNotes
  } = useQuery({queryKey: ['notes'], queryFn: getNotes})

  if (errorNotes) return (<h1> This is the error: {errorNotes.message}</h1>)
  return (
    <div>
      <Card style={{ backgroundColor: '#fffff', borderColor: '#ffffff' }}>
        {notes?.map(note => (
          <div key={note.id}>
            <Row>
              <Col span={2}>
                <Image src="/images/user_profile.jpg" alt="User Avatar" height={50} width={50}/>
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
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => null}
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
