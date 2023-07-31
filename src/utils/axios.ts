import axios from 'axios'
// import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

const Axios = () => {

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
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

return instance
}

export default Axios()