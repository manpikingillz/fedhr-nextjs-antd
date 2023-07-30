import axios from 'axios'
import { getServerSession } from 'next-auth';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
      'Content-Type': 'application/json'
    }
});

// Add a request interceptor
instance.interceptors.request.use(async config => {

  // const session = await getServerSession()

  // if (session) {
  //   console.log('session: ', session.user)
  // }
 
    // Do something before request is sent
    // For instance, add your authentication token here.

    // const authToken = localStorage.getItem('authToken');
    // if (authToken) {
    //     config.headers.Authorization = 'Bearer ' + authToken
    // }

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


export default instance