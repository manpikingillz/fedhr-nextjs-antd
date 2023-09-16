import React, { useEffect, useRef } from 'react';
import { Form, Input, Select, DatePicker, Modal, Card, InputNumber } from 'antd';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import * as dayjs from 'dayjs';

import {
  AssetCategoryListData,
  AssetCreateData,
  AssetFormProps,
  AssetUpdateData
} from './types';
import { useCreateAssetMutation, useUpdateAssetMutation } from './mutations';
import { getAssetCategoryListApi } from './api';

const AssetCreateUpdateModal = ({
  isModelOpen,
  onModelClose,
  formInstance,
  assetData,
}: AssetFormProps) => {
  // Form hooks
  const formRef = useRef(null);

  // router hooks
  const params = useParams();

  // FETCH DATA
  const {
    data: assetCategoryList,
    error: errorAssetCategoryList,
    isFetching: isFetchingAssetCategoryList,
    isLoading: isLoadingAssetCategoryList,
    status: statusAssetCategoryList,
  } = useQuery<AssetCategoryListData[]>({
    queryKey: ['asset-category-list'],
    queryFn: () => getAssetCategoryListApi(),
  });

  useEffect(() => {
    if (assetData) {
      handleSetFieldValue();
    }
  }, [assetData]);

  // MUTATIONS
  const createAssetMutation = useCreateAssetMutation();
  const updateAssetMutation = useUpdateAssetMutation();

  const createAsset = (_asset: AssetCreateData) => {
    const employeeId = parseInt(params.employeeId);
    _asset['employee'] = employeeId;
    _asset['date_assigned'] = _asset['date_assigned'] ? dayjs(_asset['date_assigned']).format('YYYY-MM-DD') : null;
    _asset['date_returned'] = _asset['date_returned'] ? dayjs(_asset['date_returned']).format('YYYY-MM-DD') : null;
    createAssetMutation.mutate({ data: _asset });
  };

  const updateAsset = (_asset: AssetUpdateData) => {
    _asset['employee'] = assetData?.employee?.id;
    _asset['date_assigned'] = _asset['date_assigned'] ? dayjs(_asset['date_assigned']).format('YYYY-MM-DD') : null;
    _asset['date_returned'] = _asset['date_returned'] ? dayjs(_asset['date_returned']).format('YYYY-MM-DD') : null;
    updateAssetMutation.mutate({ data: _asset, id: assetData?.id });
  };

  const saveAssetHandler = (
    _asset: AssetCreateData | AssetUpdateData
  ) => {
    if (Object.keys(assetData).length) {
      updateAsset(_asset);
    } else {
      createAsset(_asset);
    }
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    formInstance.setFieldsValue({
      asset_category: assetData?.asset_category?.id,
      description: assetData?.description,
      serial_number: assetData?.serial_number,
      date_assigned: assetData?.date_assigned? dayjs(assetData?.date_assigned) : null,
      date_returned: assetData?.date_returned ? dayjs(assetData?.date_returned) : null
    });
  };

  const assetCategoryOptions = () => {
    return assetCategoryList?.map((assetCategory: AssetCategoryListData) => ({
      value: assetCategory.id,
      label: assetCategory.asset_category_name
    }));
  };

  // Modal functions
  const handleOk = () => {
    // This allows as to use a modal button for submitting the form
    if (formRef.current) {
      formRef.current.submit();
    }

    if (createAssetMutation.isSuccess || updateAssetMutation.isSuccess) {
      onModelClose();
    }
  };

  const handleCancel = () => {
    onModelClose();
  };

  return (
    <>
      <Modal
        title="Add Asset"
        centered
        okText="Save"
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createAssetMutation.isLoading || updateAssetMutation.isLoading}
      >
        <Card className="bg-gray-50">
          <Form
            ref={formRef}
            name="asset-create-update-form"
            form={formInstance}
            onFinish={saveAssetHandler}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Asset Category" name="asset_category">
              <Select
                placeholder="Select"
                className="w-full"
                options={assetCategoryOptions()}
              />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Serial #" name="serial_number">
                <Input className='w-full' />
            </Form.Item>
            <Form.Item label="Date Assigned" name="date_assigned">
                <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item label="Date Returned" name="date_returned">
                <DatePicker className='w-full' />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default AssetCreateUpdateModal;
