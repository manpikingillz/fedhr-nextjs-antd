export type TrainingListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  course: {
    id: number;
    course_name: string;
  };
  completed: string;
  cost: number;
  credits: number;
  hours: number;
  instructor: string;
  note: string;
};

export type TrainingCreateData = {
  employee: number;
  course: number;
  completed: string;
  cost: number;
  credits: number;
  hours: number;
  instructor: string;
  note: string;
};

export type TrainingUpdateData = {
  employee: number;
  course: number;
  completed: string;
  cost: number;
  credits: number;
  hours: number;
  instructor: string;
  note: string;
};

export type CourseListData = {
  id: number;
  course_name: string;
};

export type TrainingFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  trainingData: TrainingListData;
};
