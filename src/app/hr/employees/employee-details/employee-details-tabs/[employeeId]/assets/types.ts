export type AssetListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  asset_category: {
    id: number;
    asset_category_name: string;
  };
  description: string;
  serial_number: string;
  date_assigned: string;
  date_returned: string;
};

export type AssetCreateData = {
  employee: number;
  asset_category: number;
  description: string;
  serial_number: string;
  date_assigned: string;
  date_returned: string;
};

export type AssetUpdateData = {
  employee: number;
  asset_category: number;
  description: string;
  serial_number: string;
  date_assigned: string;
  date_returned: string;
};

export type AssetCategoryListData = {
  id: number;
  asset_category_name: string;
};

export type AssetFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  assetData: AssetListData;
};
