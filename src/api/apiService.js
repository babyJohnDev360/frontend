import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://backend-squ3.onrender.com';
// const API_BASE_URL = 'http://localhost:4000';

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    toast.error(error.response.data.message || 'An error occurred.');
  } else if (error.request) {
    console.error('Request data:', error.request);
    toast.error('No response from server. Please try again.');
  } else {
    console.error('Error message:', error.message);
    toast.error('An error occurred. Please try again.');
  }
  console.error('Config:', error.config);
};

// Helper function to get the authorization header from local storage
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/signup`, userData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/edit`, userData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  listUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/list`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  addFund: async (fundData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/addFund`, fundData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateFund: async (fundData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/updateFund`, fundData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getFund: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getFund`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  removeFund: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/removeFund/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateServiceFee: async (feeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/updateServiceFee`, feeData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getServiceFee: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getServiceFee`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  removeServiceFee: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/removeServiceFee/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default apiService;