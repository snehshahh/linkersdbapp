import axios from 'axios';

const baseURL = 'http://localhost:5000/api/'; // Replace with your actual API base URL

const handleError = (error: any) => {
  console.error('API Error:', error);
  alert('An error occurred. Please try again.');
};

export const postRequest = async <T>(url: string, data: T) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, data);
    return response;
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const postRequestWithToken = async <T>(url: string, data: T, token: string) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const getRequestList = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await axios.get(`${baseURL}${url}`);
    return response.data as T[]; // Cast the response data to the desired array type
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error for further handling if needed
  }
};