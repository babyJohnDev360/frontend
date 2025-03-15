import axios from 'axios';

const API_BASE_URL = 'https://backend-squ3.onrender.com';
// const API_BASE_URL = 'http://localhost:4000';


// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request data:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
  console.error('Config:', error.config);
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
        headers: { Authorization: `Bearer YOUR_TOKEN_HERE` },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/edit`, userData);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  deleteUser: async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/list`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  listUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/list`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  addFund: async (fundData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/addFund`, fundData);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateFund: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/updateFund`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getFund: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getFund`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  removeFund: async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/removeFund`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateServiceFee: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/updateServiceFee`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getServiceFee: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getServiceFee`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  removeServiceFee: async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/removeServiceFee`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default apiService;