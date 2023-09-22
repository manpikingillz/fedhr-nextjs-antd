export type JobOpeningListData = {
  id: number;
  job_title: string;
  job_status: string;
  hiring_lead: {
    id: number;
    first_name: string;
    last_name: string;
  };
  hiring_department: {
    id: number;
    department_name: string;
  };
  employment_type: {
    id: number;
    employment_type_name: string;
  };
  minimum_experience: string;
  job_description: string;
  location: {
    id: number;
    location_name: string;
  };
  country: {
    id: number;
    country_name: string;
  };
  city: string;
  province: string;
  postal_code: string;
  compensation: number;
  created_at: string;
};

export type JobOpeningCreateData = {
  job_title: string;
  job_status: string;
  hiring_lead: number;
  hiring_department: number;
  employment_type: number;
  minimum_experience: string;
  job_description: string;
  location: number;
  country: number;
  city: string;
  province: string;
  postal_code: string;
  compensation: number;
};

export type JobOpeningUpdateData = {
  job_title: string;
  job_status: string;
  hiring_lead: number;
  hiring_department: number;
  employment_type: number;
  minimum_experience: string;
  job_description: string;
  location: number;
  country: number;
  city: string;
  province: string;
  postal_code: string;
  compensation: number;
};

export type JobOpeningFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  jobOpeningData: JobOpeningListData;
};
