import { useError } from '@/contexts/ErrorContext';
import axios from 'axios'
import { getSession } from 'next-auth/react';
import { ErrorContext } from '@/contexts/ErrorContext';
import { useContext } from 'react';
import { showError, showRequestError, showSuccess } from '@/app/error/error';

const Axios = () => {

// const { showError } = useContext(ErrorContext)

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Content-Type': 'application/json'
    }
});

// Add a request interceptor
instance.interceptors.request.use(async config => {
  const session = await getSession()

  const accessToken = session?.user?.accessToken

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken
  }

    return config;
  }, error => {
    // Do something with request error
    console.error('A Request Error Ocurred: ', error)
    showRequestError(error)
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.config.method === 'post' && !response.config.url?.includes('login')) {
    showSuccess(response)
  }

  return response;
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.error('A Response Error Ocurred: ', error)
  if (error.config.method === 'post') {
    showError(error)
  }

  return Promise.reject(error);
});

return instance
}

export default Axios()
