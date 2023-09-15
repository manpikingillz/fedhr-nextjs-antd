import React, { useState } from 'react';
import { Button, Divider, Empty, Form, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getEmergencyContactListApi } from './api';
import { DepartmentListData, DivisionListData, EmergencyContactListData, JobListData, LocationListData, CurrencyListData, ChangeReasonListData, RelationshipListData } from './types';
import * as dayjs from 'dayjs';
import { useDeleteEmergencyContactMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import EmergencyContactCreateUpdateModal from './EmergencyContactCreateUpdateModal';
import { CountryListData } from '@/app/api/country-types';

const createColumns = (
  onModalOpen?: (emergencyContact_item: EmergencyContactListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<EmergencyContactListData> => [
  {
    title: 'Full name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Relationship',
    dataIndex: 'relationship',
    key: 'relationship',
    render: (relationship: RelationshipListData) => <span>{relationship.relationship_name}</span>,

  },
  {
    title: 'Mobile Phone',
    dataIndex: 'mobile_phone',
    key: 'mobile_phone'
  },
  {
    title: 'Home Phone',
    dataIndex: 'home_phone',
    key: 'home_phone'
  },
  {
    title: 'Work Phone',
    dataIndex: 'work_phone',
    key: 'work_phone'
  },
  {
    title: 'Home Email',
    dataIndex: 'home_email',
    key: 'home_email'
  },
  {
    title: 'Work Email',
    dataIndex: 'work_email',
    key: 'work_email'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city'
  },
  {
    title: 'Province',
    dataIndex: 'province',
    key: 'province'
  },
  {
    title: 'Nationality',
    dataIndex: 'nationality',
    key: 'nationality',
    render: (nationality: CountryListData) => <span>{nationality.country_name}</span>,
  },
  {
    title: 'Action',
    render: (emergencyContact) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(emergencyContact)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(emergencyContact.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const EmergencyContactList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emergencyContactToEdit, setEmergencyContactToEdit] = useState<EmergencyContactListData>(
    {} as EmergencyContactListData
  );
  const [emergencyContactFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: emergencyContactList,
    error: errorEmergencyContactList,
    isFetching: isFetchingEmergencyContactList,
    isLoading: isLoadingEmergencyContactList,
    status: statusEmergencyContactList,
  } = useQuery<EmergencyContactListData[]>({
    queryKey: ['emergency-contact-list', params.employeeId],
    queryFn: () => getEmergencyContactListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setEmergencyContactToEdit({} as EmergencyContactListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_emergencyContact: EmergencyContactListData) => {
    setEmergencyContactToEdit(_emergencyContact);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteEmergencyContactMutation = useDeleteEmergencyContactMutation();
  const onDeleteHandler = (id: number) => {
    deleteEmergencyContactMutation.mutate(id);
    queryClient.refetchQueries(['emergency-contact-list']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      {isModalOpen &&
      <EmergencyContactCreateUpdateModal
        formInstance={emergencyContactFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        emergencyContactData={emergencyContactToEdit}
      />}
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorEmergencyContactList ? (
        <ErrorMessage error={errorEmergencyContactList} />
      ) : (
        <Table
          columns={columns}
          dataSource={emergencyContactList}
          pagination={false}
          loading={isFetchingEmergencyContactList || isLoadingEmergencyContactList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default EmergencyContactList;
