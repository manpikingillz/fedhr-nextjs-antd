import axios from '@/utils/axios';

import { AxiosResponse } from 'axios';
import { EmployeeListData } from '../employee-details/employee-details-tabs/[employeeId]/personal-information/types';

// Define a generic API function that takes the endpoint and data as arguments
async function api<T>(endpoint: string, data?: T) {
  try {
    const response: AxiosResponse<T> = await axios({
      method: data ? 'post' : 'get', // Use 'post' for endpoints that require data
      url: endpoint,
      data, // Include data if provided
    });

    return response.data;
  } catch (error) {
    // Handle errors, log them, or throw custom exceptions
    throw error;
  }
}

// Define your specific API endpoints
export async function getEmployeesApi(): Promise<EmployeeListData> {
  let endpoint = `employees/`;
  return api(endpoint);
}
