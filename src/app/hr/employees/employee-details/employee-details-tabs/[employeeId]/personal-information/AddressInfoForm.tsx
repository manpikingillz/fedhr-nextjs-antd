import { Button, Form, Input, Select, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  EmployeeUpdateData,
  PersonalInformationFormProps,
} from './types';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUpdateEmployeeMutation } from './mutations';
import { useQuery } from '@tanstack/react-query';
import { getCountryListApi } from '@/app/api/country-api';
import { CountryListData } from '@/app/api/country-types';

const { Option } = Select;

export function AddressInfoForm({
  employee,
}: PersonalInformationFormProps) {
  // Form hooks
  const [form] = Form.useForm();

  // router hooks
  const params = useParams();

  // FETCH DATA
  // Construct a useQuery hook that will fetch the country data
  // using the getCountryListApi function. Follow the notes example

  const {
    data: countries,
    error: errorCountries,
    isFetching: isFetchingCountries,
    isLoading: isLoadingCountries,
    status: statusNotes,
  } = useQuery<CountryListData[]>({
    queryKey: ['country-list'],
    queryFn: () => getCountryListApi(),
  });

  useEffect(() => {
    handleSetFieldValue();
  }, [employee]);

  // MUTATIONS
  // Update Employee Mutation
  const updateEmployeeMutation = useUpdateEmployeeMutation();
  const savePersonalInformationHandler = (employee: EmployeeUpdateData) => {
    const employeeId = parseInt(params.employeeId);
    updateEmployeeMutation.mutate({ data: employee, id: employeeId });
  };

  // FORM Functions
  const handleSetFieldValue = () => {
    form.setFieldsValue({
        street1: employee?.street1,
        street2: employee?.street2,
        city: employee?.city,
        province: employee?.province,
        zip_code: employee?.zip_code,
        country: employee?.country
    });
  };

  const countryOptions = () => {
    return countries?.map((country: any) => ({
      value: country.id,
      label: country.country_name,
    }));
  };

  return (
    <Form
      name="address-info-update-form"
      form={form}
      labelAlign="left"
      onFinish={savePersonalInformationHandler}
      className="flex flex-wrap"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <div className="w-1/2 pr-4">
        <Form.Item
          label="Street 1"
          name="street1"
        >
          <Input placeholder="Street 1" />
        </Form.Item>
        <Form.Item label="Street 2" name="street2">
          <Input placeholder="Street 2" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
        >
          <Input  placeholder="City" />
        </Form.Item>
      </div>

      <div className="w-1/2 pl-4">
        <Form.Item label="Province" name="province">
          <Input placeholder="Province" />
        </Form.Item>
        <Form.Item label="Zip Code" name="zip_code">
          <Input placeholder="Zip Code" />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Select
            placeholder="Select country"
            className="w-full"
            options={countryOptions()}
          />
        </Form.Item>
      </div>

      <div className="w-full flex justify-end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
