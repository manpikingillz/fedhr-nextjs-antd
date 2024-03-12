export type EmploymentStatusListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  effective_date: string;
  employment_status_type: {
    id: number;
    employment_status_type_name: string;
  };
  comment: string;
};

export type EmploymentStatusCreateData = {
  employee: number;
  effective_date: string;
  employment_status_type: number;
  comment: string;
};

export type EmploymentStatusUpdateData = {
  employee: number;
  effective_date: string;
  employment_status_type: number;
  comment: string;
};

export type EmploymentStatusTypeListData = {
  id: number;
  employment_status_type_name: string;
};

export type EmploymentStatusFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  employmentStatusData: EmploymentStatusListData;
};
