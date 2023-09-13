import axios from '@/utils/axios';
import { AxiosResponse } from 'axios';


// Define a generic API function that takes the endpoint and data as arguments
export async function api<T>(endpoint: string, data?: T) {
  try {
    const response: AxiosResponse<T> = await axios({
      method: data ? 'post' : 'get', // Use 'post' for endpoints that require data
      url: endpoint,
      data,
    });

    return response.data;
  } catch (error) {
    // Handle errors, log them, or throw custom exceptions
    throw error;
  }
}