import exp from "constants";

export type JobInformationListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  effective_date: string;
  location: {
    id: number;
    location_name: string;
  };
  division: {
    id: number;
    division_name: string;
  };
  department: {
    id: number;
    department_name: string;
  };
  job: {
    id: number;
    job_title_name: string;
  };
  reports_to: {
    id: number;
    first_name: string;
    last_name: string;
  };
};

export type JobInformationCreateData = {
  employee: number;
  effective_date: string;
  location: number;
  division: number;
  department: number;
  job: number;
  reports_to: number;
};

export type JobInformationUpdateData = {
  employee: number;
  effective_date: string;
  location: number;
  division: number;
  department: number;
  job: number;
  reports_to: number;
};

export type LocationListData = {
  id: number;
  location_name: string;
};

export type DivisionListData = {
  id: number;
  division_name: string;
};

export type DepartmentListData = {
  id: number;
  department_name: string;
};

export type JobListData = {
  id: number;
  job_title_name: string;
};

export type JobInformationFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  jobInformationData: JobInformationListData;
};
