'use client'

import React from 'react';
import { Button, Divider, Empty, Form, Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage } from '@/app/error/errorPage';
import { TemplateListData } from '@/app/types/template-types';
import { getTemplateListApi } from '@/app/api/template-api';
import { useDeleteTemplateMutation } from '@/app/mutations/template-mutations';
import { useRouter } from 'next/navigation';


const createColumns = (
  onEdit?: (template_item: TemplateListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<TemplateListData> => [
  {
    title: 'Template Name',
    dataIndex: 'template_name',
    key: 'template_name',
  },
  {
    title: 'Action',
    className: 'w-24',
    render: (template) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onEdit(template)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(template.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const TemplateList = () => {
  const [templateFormInstance] = Form.useForm();

  const router = useRouter();


  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: templateList,
    error: errorTemplateList,
    isFetching: isFetchingTemplateList,
    isLoading: isLoadingTemplateList,
    status: statusTemplateList,
  } = useQuery<TemplateListData[]>({
    queryFn: () => getTemplateListApi(),
  });

  const queryClient = useQueryClient();

  const deleteTemplateMutation = useDeleteTemplateMutation();
  const onDeleteHandler = (id: number) => {
    deleteTemplateMutation.mutate(id);
    queryClient.refetchQueries(['template-list']);
  };

  const onEditHandler = (template_item: TemplateListData) => {
    router.push(`/hr/recruitment/tabs/contract_templates/update_template/${template_item.id}`);
  }

  const columns = createColumns(onEditHandler, onDeleteHandler);

  const onAddTemplateHandler = () => {
    router.push('/hr/recruitment/tabs/contract_templates/create_template');
  };

  return (
    <div className="flex flex-col">
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onAddTemplateHandler}
      >
        Add Template
      </Button>

      {errorTemplateList ? (
        <ErrorMessage error={errorTemplateList} />
      ) : (
        <Table
          columns={columns}
          dataSource={templateList}
          pagination={false}
          loading={isFetchingTemplateList || isLoadingTemplateList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default TemplateList;
