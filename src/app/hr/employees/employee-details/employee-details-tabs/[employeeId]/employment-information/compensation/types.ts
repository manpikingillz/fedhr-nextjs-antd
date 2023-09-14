import exp from "constants";

export type CompensationListData = {
  id: number;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
  };
  effective_date: string;
  pay_type: string;
  pay_rate: string;
  pay_rate_currency: {
    id: number;
    currency_name: string;
    currency_code: string;
  };
  pay_rate_period: string;
  pay_schedule: string;
  overtime_status: string;
  change_reason: {
    id: number;
    change_reason_name: string;
  }
  payment_method: string;
  comment: string;
};

export type CompensationCreateData = {
  employee: number;
  effective_date: string;
  pay_type: string;
  pay_rate: string;
  pay_rate_currency: number;
  pay_rate_period: string;
  pay_schedule: string;
  overtime_status: string;
  change_reason: number;
  payment_method: string;
  comment: string;
};

export type CompensationUpdateData = {
  employee: number;
  effective_date: string;
  pay_type: string;
  pay_rate: string;
  pay_rate_currency: number;
  pay_rate_period: string;
  pay_schedule: string;
  overtime_status: string;
  change_reason: number;
  payment_method: string;
  comment: string;
};

export type CurrencyListData = {
  id: number;
  currency_name: string;
  currency_code: string;
};

export type ChangeReasonListData = {
  id: number;
  change_reason_name: string;
};

export type CompensationFormProps = {
  isModelOpen: boolean;
  onModelClose: () => void;
  formInstance: any;
  compensationData: CompensationListData;
};
