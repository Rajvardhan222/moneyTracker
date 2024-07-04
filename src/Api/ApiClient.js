import axios from 'axios';

// Create an instance of axios
export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1', 
  timeout: 100000, withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle the error
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

