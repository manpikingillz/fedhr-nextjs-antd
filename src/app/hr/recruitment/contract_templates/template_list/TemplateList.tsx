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
import { TemplateListData } from '../create_template/types';
import { getTemplateListApi } from '../create_template/api';
import { useDeleteTemplateMutation } from '../create_template/mutations';

const createColumns = (
  onEditTemplate?: (template_item: TemplateListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<TemplateListData> => [
  {
    title: 'Template Name',
    dataIndex: 'template_name',
    key: 'template_name',
  },
    {
    title: 'Action',
    render: (template) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onEditTemplate(template)}
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

  const columns = createColumns(undefined, onDeleteHandler);

  return (
    <div className="flex flex-col">
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
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
