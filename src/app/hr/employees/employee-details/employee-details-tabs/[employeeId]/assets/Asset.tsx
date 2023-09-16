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
import { getAssetListApi } from './api';
import { AssetListData, AssetCategoryListData } from './types';
import * as dayjs from 'dayjs';
import { useDeleteAssetMutation } from './mutations';
import { ErrorMessage } from '@/app/error/errorPage';
import AssetCreateUpdateModal from './AssetCreateUpdateModal';

const createColumns = (
  onModalOpen?: (asset_item: AssetListData) => void,
  onDelete?: (id: number) => void
): ColumnsType<AssetListData> => [
  {
    title: 'Asset Category',
    dataIndex: 'asset_category',
    key: 'asset_category',
    render: (asset_category: AssetCategoryListData) => (
      <span>{asset_category.asset_category_name}</span>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Serial Numnber',
    dataIndex: 'serial_number',
    key: 'serial_number',
  },
  {
    title: 'Date Assigned',
    dataIndex: 'date_assigned',
    key: 'date_assigned',
    render: (date_assigned) => (
      <span>{date_assigned && dayjs(date_assigned).format('MMM DD, YYYY')}</span>
    ),
  },
  {
    title: 'Date Returned',
    dataIndex: 'date_returned',
    key: 'date_returned',
    render: (date_returned) => (
      <span>{date_returned && dayjs(date_returned).format('MMM DD, YYYY')}</span>
    ),
  },
  {
    title: 'Action',
    render: (asset) => (
      <span>
        <EditTwoTone
          className="cursor-pointer"
          onClick={() => onModalOpen(asset)}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => onDelete(asset.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone className="cursor-pointer" />
        </Popconfirm>
      </span>
    ),
  },
];

const AssetList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<AssetListData>(
    {} as AssetListData
  );
  const [assetFormInstance] = Form.useForm();

  const params = useParams();

  // FETCH / QUERY DATA ///////////////////////////
  const {
    data: assetList,
    error: errorAssetList,
    isFetching: isFetchingAssetList,
    isLoading: isLoadingAssetList,
    status: statusAssetList,
  } = useQuery<AssetListData[]>({
    queryKey: ['asset-list', params.employeeId],
    queryFn: () => getAssetListApi(parseInt(params.employeeId)),
  });

  const onModalOpenHandler = () => {
    setAssetToEdit({} as AssetListData);
    setIsModalOpen(true);
  };

  const onModelCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onModalEditOpenHandler = (_asset: AssetListData) => {
    setAssetToEdit(_asset);
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();

  const deleteAssetMutation = useDeleteAssetMutation();
  const onDeleteHandler = (id: number) => {
    deleteAssetMutation.mutate(id);
    queryClient.refetchQueries(['asset-list']);
  };

  const columns = createColumns(onModalEditOpenHandler, onDeleteHandler);

  return (
    <div className="flex flex-col">
      {isModalOpen && (
        <AssetCreateUpdateModal
          formInstance={assetFormInstance}
          isModelOpen={isModalOpen}
          onModelClose={onModelCloseHandler}
          assetData={assetToEdit}
        />
      )}
      <Button
        type="primary"
        className="self-end mb-2"
        icon={<PlusCircleOutlined />}
        onClick={onModalOpenHandler}
      >
        Add
      </Button>

      {errorAssetList ? (
        <ErrorMessage error={errorAssetList} />
      ) : (
        <Table
          columns={columns}
          dataSource={assetList}
          pagination={false}
          loading={isFetchingAssetList || isLoadingAssetList}
          locale={{ emptyText: <Empty className="pt-3" /> }}
        />
      )}
    </div>
  );
};

export default AssetList;
