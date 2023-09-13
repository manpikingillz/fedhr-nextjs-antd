export type VisaInformationListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  date: string;
  visa: {
    id: number;
    visa_name: string;
  };
  issued_date: string;
  issuing_country: {
    id: number;
    country_name: string;
  };
  expiration_date: string;
  note: string;
};

export type VisaInformationCreateData = {
  employee: number;
  date: string;
  visa: number;
  issued_date: string;
  issuing_country: number;
  expiration_date: string;
  note: string;
};

export type VisaInformationUpdateData = {
  employee: number;
  date: string;
  visa: number;
  issued_date: string;
  issuing_country: number;
  expiration_date: string;
  note: string;
};

export type VisaListData = {
  id: string;
  visa_name: string;
};

export type VisaInformationFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  visaInformationData: VisaInformationListData;
};
