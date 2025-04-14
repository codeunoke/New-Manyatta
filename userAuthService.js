import axios from 'axios';

const API_URL = '/api/users';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const user = response.data;
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};
