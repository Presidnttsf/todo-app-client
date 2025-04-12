import axios from 'axios';

const API_URL = 'https://todo-server-ddz5.onrender.com/auth';

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response;
};

const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  };

const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { registerUser, loginUser, getCurrentUser };