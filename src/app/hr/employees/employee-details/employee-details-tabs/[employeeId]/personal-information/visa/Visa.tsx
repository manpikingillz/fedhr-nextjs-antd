import React, { useState } from 'react';
import { Button, Divider, Form, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import { VisaInformationListData } from './types';
import { useParams } from 'next/navigation';
import { getVisaInformationListApi } from './api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as dayjs from 'dayjs';
import { useDeleteVisaInformationMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import VisaInformationCreateUpdateModal from './VisaInformationCreateUpdateModal';

const createColumns = (
  onModalOpen?: (education_item: VisaInformationListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<VisaInformationListData> => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => <span>{dayjs(date).format('MMM D, YYYY')}</span>,
  },
  {
    title: 'Visa',
    dataIndex: 'visa',
    key: 'visa',
    render: (visa: any) => <span>{visa.visa_name}</span>,
  },
  {
    title: 'Issued Date',
    dataIndex: 'issued_date',
    key: 'issued_date',
    render: (issued_date: string) => (
      <span>{dayjs(issued_date).format('MMM D, YYYY')}</span>
    ),
  },
  {
    title: 'Issuing Country',
    key: 'issuing_country',
    dataIndex: 'issuing_country',
    render: (issuing_country: any) => (
      <span>{issuing_country.country_name}</span>
    ),
  },
  {
    title: 'Expiration Date',
    key: 'expiration_date',
    dataIndex: 'expiration_date',
    render: (expiration_date: string) => (
      <span>{dayjs(expiration_date).format('MMM D, YYYY')}</span>
    ),
  },
  {
    title: 'Note',
    key: 'note',
    dataIndex: 'note',
  },
  {
    title: 'Action',
    render: (education) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(education)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(education.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const VisaInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visaInformationToEdit, setVisaInformationToEdit] =
    useState<VisaInformationListData>({} as VisaInformationListData);
  const [visaInformationFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: visaInformations,
    error: errorVisaInformations,
    isFetching: isFetchingVisaInformations,
    isLoading: isLoadingVisaInformations,
    status: statusVisaInformations,
  } = useQuery<VisaInformationListData[]>({
    queryKey: ['visa-informations', params.employeeId],
    queryFn: () => getVisaInformationListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setVisaInformationToEdit({} as VisaInformationListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (
    _visaInformation: VisaInformationListData
  ) => {
    setVisaInformationToEdit(_visaInformation);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteVisaInformationMutation = useDeleteVisaInformationMutation();
  const onDeleteHandler = (id: number) => {
    deleteVisaInformationMutation.mutate(id);
    queryClient.refetchQueries(['visa-informations']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      <VisaInformationCreateUpdateModal
        formInstance={visaInformationFormInstance}
        isModelOpen={isModalOpen}
        onModelClose={onModelCloseHandler}
        visaInformationData={visaInformationToEdit}
      />
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorVisaInformations ? (
        <ErrorMessage error={errorVisaInformations} />
      ) : (
        <Table
          columns={columns}
          dataSource={visaInformations}
          pagination={false}
        />
      )}
    </div>
  );
};

export default VisaInformation;
