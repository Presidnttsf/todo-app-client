import axios from 'axios';

const API_URL = 'https://todo-server-ddz5.onrender.com/tasks';

const fetchTasks = async (page = 1, filters = {}) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    params: {
      page,
      ...filters,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const addTask = async (taskData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateTask = async (id, taskData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const deleteTask = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { fetchTasks, addTask, updateTask, deleteTask };