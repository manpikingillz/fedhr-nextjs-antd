export type EmergencyContactListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  name: string;
  relationship: {
    id: number;
    relationship_name: string;
  };
  mobile_phone: string;
  home_phone: string;
  work_phone: string;
  home_email: string;
  work_email: string;
  address: string;
  city: string;
  province: string;
  nationality: {
    id: number;
    country_name: string;
  }
};

export type EmergencyContactCreateData = {
  employee: number;
  name: string;
  relationship: number;
  mobile_phone: string;
  home_phone: string;
  work_phone: string;
  home_email: string;
  work_email: string;
  address: string;
  city: string;
  province: string;
  nationality: number;
};

export type EmergencyContactUpdateData = {
  employee: number;
  name: string;
  relationship: number;
  mobile_phone: string;
  home_phone: string;
  work_phone: string;
  home_email: string;
  work_email: string;
  address: string;
  city: string;
  province: string;
  nationality: number;
};

export type RelationshipListData = {
  id: number;
  relationship_name: string;
};

export type EmergencyContactFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  emergencyContactData: EmergencyContactListData;
};
